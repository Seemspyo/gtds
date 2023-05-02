export const requester = {
  async get<T>(url: string) {
    const res = await fetch(url)

    return res.json() as T
  },
}
