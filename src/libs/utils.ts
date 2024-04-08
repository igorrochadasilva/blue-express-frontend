export function formatDate(dateString: string) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}

export function calculateSLA(date: string) {
  const requestDate = new Date(date)
  const currentDate = new Date()
  const timeDiffMs = currentDate.getTime() - requestDate.getTime()
  const daysSinceCreation = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24))

  return daysSinceCreation
}
