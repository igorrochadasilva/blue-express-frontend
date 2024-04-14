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
  const typeOrder = ['Maintenance Contract', 'Software Service Contract', 'Distributor Representatives Contract'] // Desired order
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

export const contractTypeOptions = [
  { value: 'new', label: 'new' },
  { value: 'renovation', label: 'renovation' },
  { value: 'readjustment', label: 'readjustment' },
  { value: 'others', label: 'others' },
]

export const companyOptions = [
  { value: 'PD', label: 'PD' },
  { value: 'PS', label: 'PS' },
  { value: 'CH', label: 'CH' },
  { value: 'CPDI', label: 'CPDI' },
  { value: 'ALL', label: 'ALL' },
]

export const frequencyOptions = [
  { value: 'monthly', label: 'monthly' },
  { value: 'bimonthly', label: 'bimonthly' },
  { value: 'quarterly', label: 'quarterly' },
  { value: 'semi-annual', label: 'semi-annual' },
  { value: 'Yearly', label: 'Yearly' },
  { value: 'mixed/diverse', label: 'mixed/diverse' },
]

export const companyTypeOptions = [
  { value: 'private', label: 'private' },
  { value: 'public', label: 'public' },
]

export const approverLevelOptions = [
  { value: 'controller', label: 'controller' },
  { value: 'supervisor', label: 'supervisor' },
  { value: 'manager', label: 'manager' },
  { value: 'local business manager', label: 'local business manager' },
  { value: 'division', label: 'division' },
  { value: 'president', label: 'president' },
  { value: 'group', label: 'group' },
  { value: 'sector', label: 'sector' },
  { value: 'ceo', label: 'ceo' },
]

export const ufOptions = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'PR', label: 'Paraná' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'TO', label: 'Tocantins' },
]

export const typeRequestOrderOptions = [
  { value: 'representative', label: 'representative' },
  { value: 'distributor', label: 'distributor' },
]
