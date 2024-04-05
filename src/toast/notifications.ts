import { toast } from 'react-toastify'

export const notifyWrongEmailOrPasswordError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
  })
}

export const notifyForgetPasswordSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
  })
}

export const notifyForgetPasswordError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
  })
}

export const notifyDefaultError = () => {
  toast.error('An error occurred. Please try again later.', {
    position: 'top-right',
  })
}
