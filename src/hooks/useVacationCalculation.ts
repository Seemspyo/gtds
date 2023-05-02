import { DateTime } from 'luxon'

const VACATION_AVAILABLE_DAYS = 181

export const useVacationCalculation = () => {
  const now = DateTime.now()
  const getVacationEndDate = (raidEndedAt: string) =>
    DateTime.fromFormat(raidEndedAt, 'yyyy/MM/dd').plus({
      days: VACATION_AVAILABLE_DAYS,
    })
  const isValidVacation = (raidEndedAt: string) => {
    const vacationEndedAt = getVacationEndDate(raidEndedAt)

    return vacationEndedAt > now
  }

  return {
    getVacationEndDate,
    isValidVacation,
  }
}
