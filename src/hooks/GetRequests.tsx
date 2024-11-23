'use server'

import { getUserSession } from '../actions/auth'
import { listRequests } from '../actions/requests'
import { IRequestBody, TUser } from '../types/global/types'

export async function getRequests() {
  const user: TUser = await getUserSession()

  let allRequests: IRequestBody[] = []
  let errorMessage = null

  try {
    const [maintenanceContracts, softwareServiceContracts, distributorRepresentativesContracts] = await Promise.all([
      listRequests('maintenance-contract', user?.email, user?.role),
      listRequests('software-service-contract', user?.email, user?.role),
      listRequests('distributor-representatives-contract', user?.email, user?.role),
    ])

    maintenanceContracts.status === 200 || (errorMessage = maintenanceContracts.message)
    softwareServiceContracts.status === 200 || (errorMessage = softwareServiceContracts.message)
    distributorRepresentativesContracts.status === 200 || (errorMessage = distributorRepresentativesContracts.message)

    if (maintenanceContracts.status === 200) {
      allRequests = allRequests.concat(maintenanceContracts.data)
    }
    if (softwareServiceContracts.status === 200) {
      allRequests = allRequests.concat(softwareServiceContracts.data)
    }
    if (distributorRepresentativesContracts.status === 200) {
      allRequests = allRequests.concat(distributorRepresentativesContracts.data)
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error)
    throw error
  }

  return allRequests
}
