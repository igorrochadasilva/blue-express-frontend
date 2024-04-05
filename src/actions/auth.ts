import axios from 'axios'
import { setCookie } from 'cookies-next'
import {
  notifyWrongEmailOrPasswordError,
  notifyForgetPasswordError,
  notifyForgetPasswordSuccess,
  notifyDefaultError,
} from '../toast/notifications'

interface Login {
  email: string
  password: string
}

export async function handleLogin({ email, password }: Login) {
  try {
    const response = await axios.post('http://localhost:3001/auth/login', {
      email,
      password,
    })

    if (response.data.accessToken) {
      const token = response.data.accessToken

      setCookie('token', token, { maxAge: 60 * 6 * 24 })

      return true
    } else {
      notifyDefaultError()
      return false
    }
  } catch (e) {
    const error: any = e
    if (error.response?.data.message) {
      notifyWrongEmailOrPasswordError(error.response.data.message)
      return false
    } else {
      notifyDefaultError()
      return false
    }
  }
}

export async function handleForgetPassword(email: string) {
  try {
    const response = await axios.post('http://localhost:3001/auth/forget', {
      email,
    })

    if (response?.data?.message) {
      notifyForgetPasswordSuccess(response.data.message)
      return true
    } else {
      notifyDefaultError()
      return false
    }
  } catch (e) {
    const error: any = e
    if (error.response?.data.message) {
      notifyForgetPasswordError(error.response.data.message)
      return false
    } else {
      notifyDefaultError()
      return false
    }
  }
}
