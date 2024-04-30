import { useState, useEffect } from 'react'
import { listRequests } from '../actions/requests'
import { useSession } from 'next-auth/react'
import { TUser } from '../types/global/types'

const useRequestData = () => {
  const { data: session, status } = useSession()
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setError(null)

      const user: TUser = session?.user

      const maintenanceContracts = await listRequests('maintenance-contract', user?.email, user?.role)

      const softwareServiceContracts = await listRequests('software-service-contract', user?.email, user?.role)

      const distributorRepresentativesContracts = await listRequests(
        'distributor-representatives-contract',
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
