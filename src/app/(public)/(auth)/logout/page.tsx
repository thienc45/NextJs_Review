'use client'

import { useAppContext } from '@/components/app-provider';
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from '@/lib/utils';
import { useLogoutMutation } from '@/queries/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function LogoutPage() {

    const { mutateAsync } = useLogoutMutation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const refreshTokenFromUrl = searchParams.get('refreshToken')
    const accessTokenFromUrl = searchParams.get('accessToken')
    const ref = useRef<any>(null);
    const { setRole } = useAppContext()
    // useEffect(() => {
    //     if (ref.current ||
    //         (refreshTokenFromUrl && refreshTokenFromUrl !== getRefreshTokenFromLocalStorage()) ||
    //         (accessTokenFromUrl && accessTokenFromUrl !== getAccessTokenFromLocalStorage())
    //     ) return;
    //     ref.current = mutateAsync;
    //     mutateAsync().then((res) => {
    //         setTimeout(() => {
    //             ref.current = null;
    //         }, 1000);
    //         router.push('/login');
    //     });
    // }, [mutateAsync, router, refreshTokenFromUrl]);


    useEffect(() => {
        if (
            !ref.current &&
            ((refreshTokenFromUrl &&
                refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) ||
                (accessTokenFromUrl &&
                    accessTokenFromUrl === getAccessTokenFromLocalStorage()))
        ) {
            ref.current = mutateAsync
            mutateAsync().then((res) => {
                setTimeout(() => {
                    ref.current = null
                }, 1000)
                setRole()
                // setRole()
                // disconnectSocket()
            })
        } else if (accessTokenFromUrl !== getAccessTokenFromLocalStorage()) {
            router.push('/')
        }
    }, [
        mutateAsync,
        router,
        refreshTokenFromUrl,
        accessTokenFromUrl,
        setRole,
        // disconnectSocket
    ])
    // return null
    return <div>logout page </div>;
}
