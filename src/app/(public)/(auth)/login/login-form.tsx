'use client'
import { useAppContext } from '@/components/app-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useLoginMutation } from '@/queries/useAuth'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'; // Sử dụng 'next/navigation' thay vì 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginForm() {
  const loginMutation = useLoginMutation()
  const { toast } = useToast()
  const router = useRouter() // Sử dụng router từ 'next/navigation'
  const searchService = useSearchParams()
  const clearTokens = searchService.get('clearTokens')
  const { setIsAuth } = useAppContext()

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginBodyType) => {
    if (loginMutation.isPending) return;
    try {
      const result = await loginMutation.mutateAsync(data);
      toast({
        description: result.payload.message,
      });
      setIsAuth(true)
      router.push('/manage/dashboard')
      // // Chuyển hướng sau khi đăng nhập thành công
      router.refresh()
      // Làm mới trang nếu cần
    } catch (error: any) {
      handleErrorApi(error); // Xử lý lỗi
    }
  };

  useEffect(() => {
    if (clearTokens) {
      setIsAuth(false)
    }
  }, [clearTokens, setIsAuth])
  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Đăng nhập</CardTitle>
        <CardDescription>Nhập email và mật khẩu của bạn để đăng nhập vào hệ thống</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='space-y-2 max-w-[600px] flex-shrink-0 w-full' noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input id='email' type='email' placeholder='m@example.com' required {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <div className='flex items-center'>
                        <Label htmlFor='password'>Password</Label>
                      </div>
                      <Input id='password' type='password' required {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full'>
                Đăng nhập
              </Button>
              <Button variant='outline' className='w-full' type='button'>
                Đăng nhập bằng Google
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
