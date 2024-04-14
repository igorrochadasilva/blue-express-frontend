import { useState, useEffect } from 'react'
import { listMaintenanceContractRequests } from '../actions/maintenence-contract'
import { listSoftwareServiceContractRequests } from '../actions/software-service-contract'
import { listDistributorRepresentativesContractRequests } from '../actions/distributor-representatives-contract'

const useRequestData = () => {
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      const maintenanceContracts = await listMaintenanceContractRequests()
      const softwareServiceContracts = await listSoftwareServiceContractRequests()
      const distributorRepresentativesContracts = await listDistributorRepresentativesContractRequests()
      const allRequests = maintenanceContracts.concat(softwareServiceContracts, distributorRepresentativesContracts)

      if (allRequests) {
        setRequests(allRequests)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { requests, isLoading, error }
}

export default useRequestData
