'use client'

import { useAppContext } from '@/components/app-provider';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Role } from '@/constants/type';
import { cn, handleErrorApi } from '@/lib/utils';
import { useLogoutMutation } from '@/queries/useAuth';
import { RoleType } from '@/types/jwt.types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


// const menuItems = [
//   {
//     title: 'Món ăn',
//     href: '/menu'
//   },
//   {
//     title: 'Đơn hàng',
//     href: '/orders',
//     authRequired: true
//   },
//   {
//     title: 'Đăng nhập',
//     href: '/login',
//     authRequired: false
//   },
//   {
//     title: 'Quản lý',
//     href: '/manage/dashboard',
//     authRequired: true
//   }
// ]

const menuItems: {
  title: string
  href: string
  role?: RoleType[]
  hideWhenLogin?: boolean
}[] = [
    {
      title: 'home',
      href: '/'
    },
    {
      title: 'menu',
      href: '/guest/menu',
      role: [Role.Guest]
    },
    {
      title: 'orders',
      href: '/guest/orders',
      role: [Role.Guest]
    },
    {
      title: 'login',
      href: '/login',
      hideWhenLogin: true
    },
    {
      title: 'manage',
      href: '/manage/dashboard',
      role: [Role.Owner, Role.Employee]
    }
  ]

// export default function NavItems({ className }: { className?: string }) {

//   // const [isAuth, setIsAuth] = useState(false);

//   // useEffect(() => {
//   //   setIsAuth(Boolean(getAccessTokenFromLocalStorage()));
//   // }, []);

//   const { isAuth } = useAppContext()
//   console.log(isAuth)
//   return menuItems.map((item) => {
//     if ((item.authRequired === false && isAuth) ||
//       (item.authRequired === true && !isAuth)) { return null }


//     return (
//       <Link href={item.href} key={item.href} className={className}>
//         {item.title}
//       </Link>
//     )
//   })
// }

export default function NavItems({ className }: { className?: string }) {
  // const t = useTranslations('NavItem')
  // const role = useAppStore((state) => state.role)
  // const setRole = useAppStore((state) => state.setRole)
  const { setRole, role } = useAppContext()
  // const disconnectSocket = useAppStore((state) => state.disconnectSocket)
  const logoutMutation = useLogoutMutation()
  const router = useRouter()
  const logout = async () => {
    if (logoutMutation.isPending) return
    try {
      await logoutMutation.mutateAsync()
      setRole()
      // disconnectSocket()
      router.push('/')
    } catch (error: any) {
      handleErrorApi({
        error
      })
    }
  }
  return (
    <>
      {menuItems.map((item) => {
        // Trường hợp đăng nhập thì chỉ hiển thị menu đăng nhập
        const isAuth = item.role && role && item.role.includes(role)
        // Trường hợp menu item có thể hiển thị dù cho đã đăng nhập hay chưa
        const canShow =
          (item.role === undefined && !item.hideWhenLogin) ||
          (!role && item.hideWhenLogin)
        if (isAuth || canShow) {
          return (
            <Link href={item.href} key={item.href} className={className}>
              {(item.title as any)}
            </Link>
          )
        }
        return null
      })}
      {role && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className={cn(className, 'cursor-pointer')}>{('logout')}</div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {('logoutDialog.logoutQuestion')}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {('logoutDialog.logoutConfirm')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {('logoutDialog.logoutCancel')}
              </AlertDialogCancel>
              <AlertDialogAction onClick={logout}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
