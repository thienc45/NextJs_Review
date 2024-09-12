'use client'

import { decodeToken, removeTokensFromLocalStorage } from '@/lib/utils';
import { RoleType } from '@/types/jwt.types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useCallback, useContext, useLayoutEffect, useState } from 'react';
import RefreshToken from './refesh-token';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
})

// const AppContext = createContext<{
//   isAuth: boolean
//   setIsAuth: (value: boolean) => void
// }>({
//   isAuth: false,
//   setIsAuth: (value: boolean) => { }
// })

const AppContext = createContext({
  isAuth: false,
  role: undefined as RoleType | undefined,
  setRole: (role?: RoleType | undefined) => { },
  // socket: undefined as Socket | undefined,
  // setSocket: (socket?: Socket | undefined) => {},
  // disconnectSocket: () => {}
})


export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

function Provider({ children }: { children: React.ReactNode }) {
  // const [isAuth, setIsAuthState] = useState(false)
  const [role, setRoleState] = useState<RoleType | undefined>()
  // useAccountQuery({
  //   enabled: isAuth
  // })
  useLayoutEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      const role = decodeToken(accessToken).role
      setRoleState(role)
    }

  }, [])



  // const setIsAuth = useCallback((isAuth: boolean) => {
  //   if (isAuth) {
  //     setIsAuthState(true);
  //   } else {
  //     setIsAuthState(false);
  //     removeTokensFromLocalStorage();
  //   }
  // }, []);

  const setRole = useCallback((role?: RoleType | undefined) => {
    setRoleState(role)
    if (!role) {
      removeTokensFromLocalStorage();
    }

  }, []);

  const isAuth = Boolean(role)

  return <AppContext.Provider value={{ role, setRole, isAuth }}>{children}</AppContext.Provider>
}

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>{children}

        <RefreshToken />
      </Provider>
    </QueryClientProvider>
  )
}
