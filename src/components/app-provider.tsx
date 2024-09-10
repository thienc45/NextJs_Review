'use client'

import { removeTokensFromLocalStorage } from '@/lib/utils';
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
const AppContext = createContext<{
  isAuth: boolean
  setIsAuth: (value: boolean) => void
}>({
  isAuth: false,
  setIsAuth: (value: boolean) => { }
})

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

function Provider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuthState] = useState(false)
  // useAccountQuery({
  //   enabled: isAuth
  // })
  useLayoutEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    setIsAuth(Boolean(accessToken))
  }, [])

  const setIsAuth = useCallback((isAuth: boolean) => {
    if (isAuth) {
      setIsAuthState(true);
    } else {
      setIsAuthState(false);
      removeTokensFromLocalStorage();
    }
  }, []);


  return <AppContext.Provider value={{ isAuth, setIsAuth }}>{children}</AppContext.Provider>
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
