import axios from 'axios'
import { notifyDefaultError, notifyError, notifySuccess } from '../toast/notifications'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../app/api/auth/[...nextauth]/route'
import { listRequests } from './requests'
import { TUser } from '../types/global/types'

interface IResetPassword {
  password: string
  token: string | null
}

export async function handleForgetPassword(email: string) {
  try {
    const response = await axios.post('http://localhost:3001/auth/forget', {
      email,
    })

    if (response?.data?.message) {
      notifySuccess(response.data.message)
      return true
    } else {
      notifyDefaultError()
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

export async function handleResetPassword({ password, token }: IResetPassword) {
  if (!token) {
    notifyError("You don't have access to reset password, please check your e-mail.")
  }

  try {
    const response = await axios.post('http://localhost:3001/auth/reset', {
      password,
      token,
    })

    if (response.data.message) {
      notifySuccess(response.data.message)
      return true
    } else {
      notifyDefaultError()
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

export async function getUserSession() {
  const session = await getServerSession(nextAuthOptions)
  return session?.user
}

export async function getRequests() {
  const user: TUser = await getUserSession()

  const maintenanceContracts = await listRequests('maintenance-contract', user?.email, user?.role)

  const softwareServiceContracts = await listRequests('software-service-contract', user?.email, user?.role)

  const distributorRepresentativesContracts = await listRequests(
    'distributor-representatives-contract',
    user?.email,
    user?.role
  )

  const allRequests = maintenanceContracts.concat(softwareServiceContracts, distributorRepresentativesContracts)

  return allRequests
}
