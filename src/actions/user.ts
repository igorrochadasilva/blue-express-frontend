import axios from 'axios'
import { notifyDefaultError, notifyError } from '../toast/notifications'

export async function listUsers(token: string | undefined) {
  try {
    const res = await axios.get('http://localhost:3001/users', {
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function getUser(id: number | undefined, token: string | undefined, approvers: boolean) {
  let queryApprovers = approvers && '?approvers=true'

  try {
    const res = await axios.get(`http://localhost:3001/users/${id}${queryApprovers}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
