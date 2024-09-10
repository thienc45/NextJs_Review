import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const privatePaths = ["/manage"];
const authPaths = ["/login"];

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const accessToken = request.cookies.get("accessToken")?.value;
//   const isAuth = Boolean(request.cookies.get("accessToken")?.value);

//   // Chưa đăng nhập thì không cho vào private paths
//   if (privatePaths.some((path) => pathname.startsWith(path)) && !isAuth) {
//     const url = new URL("/logout", request.url);
//     url.searchParams.set(
//       "refreshToken",
//       request.cookies.get("refreshToken")?.value ?? ""
//     );
//     return NextResponse.redirect(url);
//   }

//   // Chưa đăng nhập thì không cho vào private paths
//   // if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
//   //   return NextResponse.redirect(new URL("/login", request.url));
//   // }
//   // Đăng nhập rồi thì không cho vào login/register nữa
//   if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   return NextResponse.next();
// }

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // pathname: /manage/dashboard
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Chưa đăng nhập và cố gắng truy cập vào các private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Đăng nhập rồi và cố gắng truy cập vào login mà
  if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Trường hợp đã đăng nhập rồi, nhưng access token lại hết hạn
  if (
    privatePaths.some((path) => pathname.startsWith(path)) &&
    !accessToken &&
    refreshToken
  ) {
    const url = new URL("/logout", request.url);
    url.searchParams.set("refreshToken", refreshToken ?? "");
    // request.cookies.get('refreshToken')?.value ?? ''
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/manage/:path*"],
};
