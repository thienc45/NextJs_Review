import accountApiRequest from '@/apiRequests/account';
import authApiRequest from '@/apiRequests/auth';
import { UpdateEmployeeAccountBodyType } from '@/schemaValidations/account.schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAccountQuery = () => {

  // { enabled }: { enabled: boolean }
  return useQuery({
    queryKey: ['account', 'me'],
    queryFn: accountApiRequest.me,
    // enabled
  })
}


export const useUpdateMeMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.updateMe
  })
}

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.changePassword
  })
}

export const useAccountListQuery = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: accountApiRequest.list
  })
}

export const useGetEmployeeQuery = ({ id, enabled }: { id: number; enabled: boolean }) => {
  return useQuery({
    queryKey: ['accounts', id],
    queryFn: () => accountApiRequest.getEmployee(id),
    enabled
  })
}

export const useAddEmployeeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accountApiRequest.addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['accounts']
      })
    }
  })
}

export const useUpdateEmployeeMutation = () => {
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateEmployeeAccountBodyType & { id: number }) =>
      accountApiRequest.updateEmployee(id, body)
  })
}

export const useDeleteEmployeeMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.deleteEmployee
  })
}


export const useGetAccountList = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: accountApiRequest.list
  })
}

export const useGetAccount = ({
  id,
  enabled
}: {
  id: number
  enabled: boolean
}) => {
  return useQuery({
    queryKey: ['accounts', id],
    queryFn: () => accountApiRequest.getEmployee(id),
    enabled
  })
}

export const useAddAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accountApiRequest.addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['accounts']
      })
    }
  })
}

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      ...body
    }: UpdateEmployeeAccountBodyType & { id: number }) =>
      accountApiRequest.updateEmployee(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['accounts'],
        exact: true
      })
    }
  })
}

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accountApiRequest.deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['accounts']
      })
    }
  })
}





// export const useGetGuestListQuery = (
//   queryParams: GetGuestListQueryParamsType
// ) => {
//   return useQuery({
//     queryFn: () => accountApiRequest.guestList(queryParams),
//     queryKey: ['guests', queryParams]
//   })
// }

// export const useCreateGuestMutation = () => {
//   return useMutation({
//     mutationFn: accountApiRequest.createGuest
//   })
// }

