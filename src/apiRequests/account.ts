import http from "@/lib/http";
import {
  AccountListResType,
  AccountResType,
  CreateEmployeeAccountBodyType,
  UpdateEmployeeAccountBodyType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

const accountApiRequest = {
  me: () => http.get<AccountResType>("accounts/me"),

  sMe: (accessToken: string) =>
    http.get<AccountResType>("/account/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  updateMe: (body: UpdateMeBodyType) =>
    http.put<AccountResType>("accounts/me", body),
  list: () => http.get<AccountListResType>("accounts"),
  addEmployee: (body: CreateEmployeeAccountBodyType) =>
    http.post<AccountResType>("accounts", body),
  updateEmployee: (id: number, body: UpdateEmployeeAccountBodyType) =>
    http.put<AccountResType>(`accounts/detail/${id}`, body),
  deleteEmployee: (id: number) =>
    http.delete<AccountResType>(`accounts/detail/${id}`),
  getEmployee: (id: number) =>
    http.get<AccountResType>(`accounts/detail/${id}`),
};

export default accountApiRequest;
