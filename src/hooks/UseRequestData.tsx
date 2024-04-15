import { useState, useEffect } from 'react'
import { listMaintenanceContractRequests } from '../actions/maintenence-contract'
import { listSoftwareServiceContractRequests } from '../actions/software-service-contract'
import { listDistributorRepresentativesContractRequests } from '../actions/distributor-representatives-contract'
import { useSession } from 'next-auth/react'
import { TUser } from '../types/global/types'

const useRequestData = () => {
  const { data: session, status } = useSession()
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      const user: TUser = session?.user

      const maintenanceContracts = await listMaintenanceContractRequests(user?.email, user?.role)

      const softwareServiceContracts = await listSoftwareServiceContractRequests(user?.email, user?.role)

      const distributorRepresentativesContracts = await listDistributorRepresentativesContractRequests(
        user?.email,
        user?.role
      )

      const allRequests = maintenanceContracts.concat(softwareServiceContracts, distributorRepresentativesContracts)

      if (allRequests) {
        setRequests(allRequests)
        setIsLoading(false)
      }
    }

    status === 'authenticated' && fetchData()
  }, [status])

  return { requests, isLoading, error }
}

export default useRequestData
