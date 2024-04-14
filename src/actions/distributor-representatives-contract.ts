import axios from 'axios'
import { notifyDefaultError, notifyError, notifySuccess } from '../toast/notifications'
import { TContracts, TUser } from '../types/global/types'

export async function listDistributorRepresentativesContractRequests() {
  try {
    const res = await axios.get('http://localhost:3001/request/distributor-representatives-contract')
    if (res.status === 200) {
      return res.data
    } else {
      return false
    }
  } catch (e) {
    const error: any = e
    if (error.response?.data.message) {
      notifyError(error.response.data.message)
      return false
    } else {
      notifyDefaultError()
      return false
    }
  }
}

export async function createDistributorRepresentativesContractsRequest(data: TContracts, user: TUser) {
  const formatData = {
    ...data,
    title: 'Distributor Representative Contract',
    status: 'waiting for approval',
    requester: user?.id,
    commissionPercentage: Number(data.commissionPercentage),
  }
  console.log('🚀 ~ createDistributorRepresentativesContractsRequest ~ formatData:', formatData)

  try {
    const res = await axios.post('http://localhost:3001/request/distributor-representatives-contract', formatData)

    if (res.data) {
      notifySuccess('Request Created Successfully.')
      return res.data
    } else {
      return false
    }
  } catch (e) {
    const error: any = e
    if (error.response?.data.message) {
      if (Array.isArray(error.response?.data.message)) {
        notifyError(error.response.data.message[0])
      } else {
        notifyError(error.response.data.message)
      }

      return false
    } else {
      notifyDefaultError()
      return false
    }
  }
}
