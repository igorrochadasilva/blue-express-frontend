import axios from 'axios'
import { notifyDefaultError, notifyError, notifySuccess } from '../toast/notifications'
import { IRequestBody, TUser } from '../types/global/types'

export async function listDistributorRepresentativesContractRequests(
  email: string | null | undefined,
  role: number | undefined
) {
  try {
    const res = await axios.get('http://localhost:3001/request/distributor-representatives-contract', {
      params: {
        email,
        role,
      },
    })
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

export async function createDistributorRepresentativesContractsRequest(data: IRequestBody, user: TUser) {
  const formatData = {
    ...data,
    title: 'Distributor Representative Contract',
    status: 'waiting for approval',
    requester: user?.id,
    commissionPercentage: Number(data.commissionPercentage),
  }

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

export async function getDistributorRepresentativesContractRequest(id: string) {
  try {
    const res = await axios.get(`http://localhost:3001/request/distributor-representatives-contract/${id}`)

    if (res.data) {
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

export async function updateDistributorRepresentativesContractRequest(data: IRequestBody) {
  const formatData = {
    ...data,
    status: 'waiting for approval',
    commissionPercentage: Number(data.commissionPercentage),
  }

  try {
    const res = await axios.patch(
      `http://localhost:3001/request/distributor-representatives-contract/${formatData.id}`,
      formatData
    )

    if (res.data) {
      notifySuccess('Updated Request Successfully.')
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
