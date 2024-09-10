'use client'

import authApiRequest from '@/apiRequests/auth';
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage, setAccessTokenToLocalStorage, setRefreshTokenToLocalStorage } from '@/lib/utils';
import jwt from 'jsonwebtoken';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';


// Những page sau sẽ không check refresh token
const UNAUTHENTICATED_PATH = ['/login', '/logout', '/refresh-token']

export default function RefreshToken() {
    const pathname = usePathname()
    useEffect(() => {
        if (UNAUTHENTICATED_PATH.includes(pathname)) return
        let interval: any = null

        const checkAndRefreshToken = async () => {
            // Không nên đưa logic lấy access và refresh token ra khỏi call function 'checkAndRefreshToken'
            // Vì ở mỗi lần mà checkAndRefreshToken() được gọi thì luôn phải có một access và refresh token mới
            // Tránh hiện tượng bug nếu lấy access và refresh token cũ từ ngoài hàm và gọi cho các lần tiếp theo
            const accessToken = getAccessTokenFromLocalStorage()
            const refreshToken = getRefreshTokenFromLocalStorage()
            if (!accessToken || !refreshToken) return
            const decodedAccessToken = jwt.decode(accessToken) as {
                exp: number
                iat: number
            }

            const decodedRefreshToken = jwt.decode(refreshToken) as {
                exp: number
                iat: number
            }

            // Thời điểm hết hạn của token là tính theo epoch time (s)
            // Còn khi các bạn dùng các phép new Date().getTime() thì phải chuyển về epoch time (ms)
            const now = Math.round(new Date().getTime() / 1000)

            // Trường hợp refresh token hết hạn thì không xử lý nữa
            if (decodedRefreshToken.exp <= now) return

            // Vì access token của chúng ta có thời gian hết hạn là 10s
            // thì mình sẽ kiểm tra còn 1/3 thời gian (3s) thì mình sẽ cho refresh token lại
            // Thời gian còn lại sẽ tính dựa trên công thức: decodedAccessToken.exp - now
            // Thời gian hết hạn của access token dựa trên công thức: decodedAccessToken.exp - decodedAccessToken.iat
            if (decodedAccessToken.exp - now <= (decodedAccessToken.exp - decodedAccessToken.iat) / 3) {
                const res = await authApiRequest.refreshToken()
                try {
                    const res = await authApiRequest.refreshToken()
                    setAccessTokenToLocalStorage(res.payload.data.accessToken)
                    setRefreshTokenToLocalStorage(res.payload.data.refreshToken)
                } catch (error) {

                }
            }

            // Thêm logic để kiểm tra và làm mới access token nếu cần
        }

        // Thêm logic để gọi hàm checkAndRefreshToken() theo khoảng thời gian nhất định
        //    Phải bé hơn thời gian hết hạn token
        const TIMEOUT = 1000
        interval = setInterval(checkAndRefreshToken, TIMEOUT)
        // Ví dụ: mỗi 5 phút
        checkAndRefreshToken()
        // Gọi ngay khi component mount



        return () => clearInterval(interval) // Dọn dẹp interval khi component unmount
    }, [pathname])

    return null
}