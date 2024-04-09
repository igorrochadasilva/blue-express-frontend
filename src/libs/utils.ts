import { IApprover } from '../types/global/types'

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

export function sortRequestType(a: IApprover, b: IApprover) {
  const typeOrder = [
    'Maintenance Contract',
    'Software Service Contract',
    'Distributor Representatives Contract',
  ] // Desired order
  const aIndex = typeOrder.indexOf(a.type)
  const bIndex = typeOrder.indexOf(b.type)
  return aIndex - bIndex
}

export function sortNumber(a: string, b: string) {
  // Extract the numerical value from the dollar-formatted string:
  const competenceA = parseFloat(a.replace(/\$/g, ''))
  const competenceB = parseFloat(b.replace(/\$/g, ''))

  // Perform numerical comparison:
  return competenceA - competenceB
}

export function sortAlphabetically(a: string, b: string) {
  return a.localeCompare(b) // Alphabetical sorting
}

export function formatToUSD(value: number) {
  const formattedValue = value.toFixed(2)
  return `$${formattedValue}`
}
