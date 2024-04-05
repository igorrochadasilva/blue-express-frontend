import axios from 'axios'
import { setCookie } from 'cookies-next'
import {
  notifyDefaultError,
  notifyLoginError,
  notifyLoginSuccess,
} from '../toast/notifications'

interface ILogin {
  email: string
  password: string
}

interface IResetPassword {
  password: string
  token: string | null
}

export async function handleLogin({ email, password }: ILogin) {
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
      notifyLoginError(error.response.data.message)
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
      notifyLoginSuccess(response.data.message)
      return true
    } else {
      notifyDefaultError()
      return false
    }
  } catch (e) {
    const error: any = e
    if (error.response?.data.message) {
      notifyLoginError(error.response.data.message)
      return false
    } else {
      notifyDefaultError()
      return false
    }
  }
}

export async function handleResetPassword({ password, token }: IResetPassword) {
  if (!token) {
    notifyLoginError(
      "You don't have access to reset password, please check your e-mail."
    )
  }

  try {
    const response = await axios.post('http://localhost:3001/auth/reset', {
      password,
      token,
    })

    if (response.data.message) {
      notifyLoginSuccess(response.data.message)
      return true
    } else {
      notifyDefaultError()
      return false
    }
  } catch (e) {
    const error: any = e
    if (error.response?.data.message) {
      notifyLoginError(error.response.data.message)
      return false
    } else {
      notifyDefaultError()
      return false
    }
  }
}
