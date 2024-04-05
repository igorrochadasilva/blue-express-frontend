import { toast } from 'react-toastify'

export const notifyLoginError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
  })
}

export const notifyLoginSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
  })
}

export const notifyDefaultError = () => {
  toast.error('An error occurred. Please try again later.', {
    position: 'top-right',
  })
}
