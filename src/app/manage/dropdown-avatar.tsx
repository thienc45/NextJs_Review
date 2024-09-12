'use client'

import { useAppContext } from '@/components/app-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { handleErrorApi } from '@/lib/utils'
import { useAccountQuery } from '@/queries/useAccount'
import { useLogoutMutation } from '@/queries/useAuth'

import Link from 'next/link'
import { useRouter } from 'next/navigation'


// const account = {
//   name: 'Nguyễn Văn A',
//   avatar: 'https://i.pravatar.cc/150'
// }

export default function DropdownAvatar() {
  const logoutMutation = useLogoutMutation()
  const router = useRouter()
  const { data } = useAccountQuery()
  const account = data?.payload.data
  const { setRole } = useAppContext()
  const logout = async () => {
    if (logoutMutation.isPending) return;
    try {
      await logoutMutation.mutateAsync();
      setRole()
      router.push('/login')
    } catch (error) {
      handleErrorApi({ error })
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
          <Avatar>
            <AvatarImage src={account?.avatar ?? undefined} alt={account?.name} />
            <AvatarFallback>{account?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{account?.avatar}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={'/manage/setting'} className='cursor-pointer'>
            Cài đặt
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
