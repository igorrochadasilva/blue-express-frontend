import axios from 'axios'
import {
  notifyDefaultError,
  notifyError,
  notifySuccess,
} from '../toast/notifications'

export async function listApprovers() {
  try {
    const res = await axios.get('http://localhost:3001/approvers', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaWdvciByb2NoYSIsImVtYWlsIjoiaWdvcjA4MjAxMUBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNzEyNjIyMTM5LCJleHAiOjE3MTI3MDg1MzksImF1ZCI6InVzZXJzIiwiaXNzIjoibG9naW4iLCJzdWIiOiIxIn0.qK6EK7bRU-C6wCAvMIS-qRdAX89KQ_9ZULii3tgwYvg`,
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

export async function deleteApprover(id: number) {
  try {
    const res = await axios.delete(`http://localhost:3001/approvers/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaWdvciByb2NoYSIsImVtYWlsIjoiaWdvcjA4MjAxMUBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNzEyNjIyMTM5LCJleHAiOjE3MTI3MDg1MzksImF1ZCI6InVzZXJzIiwiaXNzIjoibG9naW4iLCJzdWIiOiIxIn0.qK6EK7bRU-C6wCAvMIS-qRdAX89KQ_9ZULii3tgwYvg`,
      },
    })
    if (res.data) {
      notifySuccess('Approver created successfully')
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
