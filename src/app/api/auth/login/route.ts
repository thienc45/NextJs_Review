import { authApiRequest } from "@/apiRequests/route";
import { HttpError } from "@/lib/http";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { LoginBodyType } from "../../../../schemaValidations/auth.schema";

export async function POST(request: Request) {
  const res = (await request.json()) as LoginBodyType;
  console.log(1);
  const cookieStore = cookies();
  try {
    const { payload } = await authApiRequest.SLogin(res);
    const {
      data: { accessToken, refreshToken },
    } = payload;
    const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number };

    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: new Date(decodedAccessToken.exp * 1000),
    });
    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: new Date(decodedRefreshToken.exp * 1000),
    });
    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Lỗi không xác định",
        },
        {
          status: 500,
        }
      );
    }
  }
}
