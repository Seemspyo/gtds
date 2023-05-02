export const useOpenOuterLink = () => {
  return (url: string) => {
    window.open(url, '_blank')
  }
}
