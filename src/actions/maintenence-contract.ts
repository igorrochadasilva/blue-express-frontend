import axios from 'axios'
import { notifyDefaultError, notifyError } from '../toast/notifications'

export async function listMaintenanceContractRequests() {
  try {
    const res = await axios.get('http://localhost:3001/request/maintenance-contract')

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
