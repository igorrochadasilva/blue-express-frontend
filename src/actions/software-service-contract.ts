import axios from 'axios'
import { notifyDefaultError, notifyError } from '../toast/notifications'

export async function listSoftwareServiceContractRequests() {
  try {
    const res = await axios.get(
      'http://localhost:3001/request/software-service-contract'
    )

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
