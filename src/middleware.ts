import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Role } from "./constants/type";
import { decodeToken } from "./lib/utils";

// const privatePaths = ["/manage"];
// const authPaths = ["/login"];
// const privatePaths = [...managePaths, ...guestPaths];

const managePaths = ["/manage"];
const guestPaths = ["/guest"];
const privatePaths = [...managePaths, ...guestPaths];
const unAuthPaths = ["/login"];

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
  if (unAuthPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Trường hợp đã đăng nhập rồi, nhưng access token lại hết hạn
  // if (
  //   privatePaths.some((path) => pathname.startsWith(path)) &&
  //   !accessToken &&
  //   refreshToken
  // ) {
  //   const url = new URL("/logout", request.url);
  //   url.searchParams.set("refreshToken", refreshToken ?? "");
  //   // request.cookies.get('refreshToken')?.value ?? ''
  //   return NextResponse.redirect(url);
  // }

  // 2. Trường hợp đã đăng nhập
  if (refreshToken) {
    // 2.1 Nếu cố tình vào trang login sẽ redirect về trang chủ
    if (unAuthPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 2.2 Nhưng access token lại hết hạn
    if (
      privatePaths.some((path) => pathname.startsWith(path)) &&
      !accessToken
    ) {
      const url = new URL("/refresh-token", request.url);
      url.searchParams.set("refreshToken", refreshToken);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // 2.3 Vào không đúng role, redirect về trang chủ
    const role = decodeToken(refreshToken).role;
    console.log(role + "midderle");
    // Guest nhưng có vào route owner
    const isGuestGoToManagePath =
      role === Role.Guest &&
      managePaths.some((path) => pathname.startsWith(path));

    // không phải Guest nhưng có vào route guest
    const isNotGuestGoToGuestPath =
      role !== Role.Guest &&
      guestPaths.some((path) => pathname.startsWith(path));

    if (isGuestGoToManagePath || isNotGuestGoToGuestPath) {
      console.log(3);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/manage/:path*", "/guest/:path*", "/login"],
};
