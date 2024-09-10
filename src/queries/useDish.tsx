import dishApiRequest from '@/apiRequests/dish'
import { UpdateDishBodyType } from '@/schemaValidations/dish.schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useDishListQuery = () => {
  return useQuery({
    queryKey: ['dishs'],
    queryFn: dishApiRequest.list
  })
}

export const useGetDishQuery = ({ id, enabled }: { id: number; enabled: boolean }) => {
  return useQuery({
    queryKey: ['dishs', id],
    queryFn: () => dishApiRequest.getDish(id),
    enabled
  })
}

export const useAddDishMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: dishApiRequest.add,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dishs']
      })
    }
  })
}

export const useUpdateDishMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...body }: UpdateDishBodyType & { id: number }) => dishApiRequest.updateDish(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dishs']
      })
    }
  })
}

export const useDeleteDishMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: dishApiRequest.deleteDish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dishs']
      })
    }
  })
}
