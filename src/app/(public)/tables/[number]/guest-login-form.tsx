'use client'
import { useAppContext } from '@/components/app-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useGuestLoginMutation } from '@/queries/useGuest'
import { GuestLoginBody, GuestLoginBodyType } from '@/schemaValidations/guest.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function GuestLoginForm() {
  const params = useParams()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  // console.log(token)
  const tableNumber = Number(params.number)
  const loginMutation = useGuestLoginMutation()
  const { setRole } = useAppContext()
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<GuestLoginBodyType>({
    resolver: zodResolver(GuestLoginBody),
    defaultValues: {
      name: '',
      token: token ?? '',
      tableNumber: tableNumber
    }
  })

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  async function onSubmit(values: GuestLoginBodyType) {

    if (loginMutation.isPending) return
    try {
      const result = await loginMutation.mutateAsync({
        name: values.name,
        token: token ?? '',
        tableNumber: tableNumber
      })
      console.log(result)
      setRole(result.payload.data.guest.role)
      toast({
        description: result.payload.message
      })
      setRole(result.payload.data.guest.role)

      router.push('/guest/menu')
    } catch (error: any) {

      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }



  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Đăng nhập gọi món</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (e) => {
              console.log(e)
            })}
            className='space-y-2 max-w-[600px] flex-shrink-0 w-full'
            noValidate
          >
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Tên khách hàng</Label>
                      <Input id='name' type='text' required {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full'>
                Đăng nhập
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
