import axios from 'axios'
import { notifyDefaultError, notifyError, notifySuccess } from '../toast/notifications'
import { IRequestBody, TUser } from '../types/global/types'
import { generateRequestFormData } from '../libs/utils'

export async function listRequests(requestType: string, email: string | null | undefined, role: number | undefined) {
  'use server'
  try {
    const res = await axios.get(`http://localhost:3001/request/${requestType}`, {
      params: {
        email,
        role,
      },
    })

    return { status: 200, data: res.data, message: 'successful' }
  } catch (e) {
    const error: any = e
    if (error.response?.data.message) {
      return { status: 400, data: null, message: error.response?.data.message }
    } else {
      return { status: 500, data: null, message: 'An error occurred. Please try again later.' }
    }
  }
}

export async function createRequest(requestType: string, data: IRequestBody, user: TUser) {
  const { files, ...dataRest } = data

  const formatData = generateRequestFormData(requestType, dataRest, user)
  formatData.filesName = ''

  const newFormData = new FormData()
  const arrayFiles = Array.from(files)

  arrayFiles.forEach((file: any) => {
    newFormData.append(file.name, file)
    formatData.filesName += file.name + ','
  })

  formatData.filesName = formatData.filesName.slice(0, -1)

  newFormData.append('data', JSON.stringify(formatData))

  try {
    const res = await axios.post(`http://localhost:3001/request/${requestType}`, newFormData)

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

export async function getRequest(requestType: string, id: string) {
  try {
    const res = await axios.get(`http://localhost:3001/request/${requestType}/${id}`)

    if (res.data) {
      return res.data
    } else {
      return false
    }
  } catch (e) {
    const error: any = e
    if (error.response?.data.message) {
      if (Array.isArray(error.response?.data.message)) {
        // notifyError(error.response.data.message[0])
      } else {
        // notifyError(error.response.data.message)
      }

      return false
    } else {
      // notifyDefaultError()
      return false
    }
  }
}

export async function updateRequest(user: TUser, requestType: string, data: IRequestBody) {
  const { files, ...dataRequestRest } = data
  const newFormData = new FormData()
  const arrayFiles = Array.from(files)

  const formatData = generateRequestFormData(requestType, dataRequestRest)

  formatData.filesName = ''

  arrayFiles.forEach((file: any) => {
    newFormData.append(file.name, file)
    formatData.filesName += file.name + ','
  })

  formatData.filesName = formatData.filesName.slice(0, -1)

  newFormData.append('data', JSON.stringify(formatData))

  try {
    const res = await axios.patch(
      `http://localhost:3001/request/${requestType}/${dataRequestRest.id}?user=${user?.id}`,
      newFormData
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
