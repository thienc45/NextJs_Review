// import authApiRequest from '@/apiRequests/auth'
import authApiRequest from '@/apiRequests/auth'
import { useMutation } from '@tanstack/react-query'
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.logout
  })
}

export const useGuestLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.guestLogin
  })
}

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login
  })
}
