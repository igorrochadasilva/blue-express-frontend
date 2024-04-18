import axios from 'axios'
import { notifyDefaultError, notifyError, notifySuccess } from '../toast/notifications'
import { IRequestBody, TUser } from '../types/global/types'

export async function listMaintenanceContractRequests(email: string | null | undefined, role: number | undefined) {
  try {
    const res = await axios.get('http://localhost:3001/request/maintenance-contract', {
      params: {
        email,
        role,
      },
    })

    if (res.data) {
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

export async function createMaintenanceContractRequest(data: IRequestBody, user: TUser) {
  const formatData = {
    ...data,
    title: 'Maintenance Contract',
    status: 'waiting for approval',
    requester: user?.id,
    contractRenewQtd: Number(data.contractTotalValue),
    contractTotalValue: Number(data.contractTotalValue),
    dollarExchangeRate: Number(data.dollarExchangeRate),
    totalValueUSD: Number(data.totalValueUSD),
    gm: Number(data.gm),
    renewIndexPercentage: Number(data.renewIndexPercentage),
    index: Number(data.index),
  }

  try {
    const res = await axios.post('http://localhost:3001/request/maintenance-contract', formatData)

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

export async function getMaintenanceContractRequest(id: string) {
  try {
    const res = await axios.get(`http://localhost:3001/request/maintenance-contract/${id}`)

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

export async function updateMaintenanceContractRequest(data: IRequestBody) {
  const formatData = {
    ...data,
    status: 'waiting for approval',
    contractRenewQtd: Number(data.contractTotalValue),
    contractTotalValue: Number(data.contractTotalValue),
    dollarExchangeRate: Number(data.dollarExchangeRate),
    totalValueUSD: Number(data.totalValueUSD),
    gm: Number(data.gm),
    renewIndexPercentage: Number(data.renewIndexPercentage),
    index: Number(data.index),
  }

  try {
    const res = await axios.patch(`http://localhost:3001/request/maintenance-contract/${formatData.id}`, formatData)

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
