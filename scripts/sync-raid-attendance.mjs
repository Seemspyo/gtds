import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// eslint-disable-next-line import/no-extraneous-dependencies
import prettier from 'prettier'

const apiDir = resolve(
  fileURLToPath(new URL(import.meta.url)),
  '../../public/resources/api'
)
const readAsJSON = async (url) => {
  const buffer = await readFile(url)

  return JSON.parse(buffer.toString('utf8'))
}
const uidRegExp = /^([A-Z]|\d){5}$/

const members = await readAsJSON(resolve(apiDir, 'members.json'))
const attendances = await readAsJSON(resolve(apiDir, 'raid-attendances.json'))
const memberNicknameToUidMap = members.reduce(
  (memberMapAcc, member) => ({
    ...memberMapAcc,
    [member.nickname.toLowerCase()]: member.uid,
  }),
  {}
)

const nextAttendances = attendances.map(
  ({ perfectAttendanceMemberUids, ...history }) => {
    const firstUidOrNickname = perfectAttendanceMemberUids.at(0)
    if (!firstUidOrNickname || uidRegExp.test(firstUidOrNickname)) {
      return {
        ...history,
        perfectAttendanceMemberUids,
      }
    }

    return {
      ...history,
      perfectAttendanceMemberUids: perfectAttendanceMemberUids.map(
        (nickname) => {
          const uid = memberNicknameToUidMap[nickname.toLowerCase()]

          if (!uid) {
            throw new Error(`failed to find member with nickname="${nickname}"`)
          }

          return uid
        }
      ),
    }
  }
)

await writeFile(
  resolve(apiDir, 'raid-attendances.json'),
  Buffer.from(
    prettier.format(JSON.stringify(nextAttendances), {
      parser: 'json',
    })
  )
)
