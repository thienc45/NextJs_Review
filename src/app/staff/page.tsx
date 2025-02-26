'use client'

import { ActivitySchema, ActivityType, EmployeeType } from "@/schemaValidations/attendance.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {

    const [data, setData] = useState<EmployeeType | null>(null);
    const [buttonText, setButtonText] = useState("Log Task");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ActivityType>({
        resolver: yupResolver(ActivitySchema),
        defaultValues: {
            empId: 0,
            type: 2,
            activityTime: "8:30:00",
            longtitude: 105.793605,
            latitude: 21.0383251,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const url = "http://192.168.90.23:7026/api/Employee/8";
            try {
                const response = await axios.get(url);
                const employeeData = response.data.data;
                console.log(employeeData + "22222")
                setData(employeeData);
                reset({
                    empId: employeeData.empId,
                    type: employeeData.type,
                    longtitude: employeeData.longitude,
                    latitude: employeeData.latitude,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [reset]);

    const onSubmit = async (formData: ActivityType) => {
        try {
            const url = "http://192.168.90.23:7026/api/Activity";
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTGluaCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImxpbmhAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlJPTEVfQURNSU4iLCJST0xFX0VNUExPWUVFIl0sImV4cCI6MTczMDI1NTQwNSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE3MyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxNzMifQ.EQwcBNPVItrHR57NN-HP8-PoODOy0A1I0BrMdL09onQ";

            const response = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Data sent successfully:", response.data);
            setButtonText("Back to Work");
            reset();
        } catch (error) {
            console.error("Error sending data:", error);

        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-center mb-4">
                    <Image
                        src="/assets/images/fulllogo_pgt.png"
                        alt="logo"
                        width={200}
                        height={200}
                    />
                </div>
                <h1 className="text-center text-xl font-bold mb-4 text-red-300">
                    {data ? data.fullName : "Loading..."}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Employee ID"
                        {...register("empId", { required: true })}
                        className="mb-4 p-2 w-full border rounded"
                    />
                    {errors.empId && <p className="text-red-500">Employee ID is required.</p>}

                    <input
                        type="text"
                        placeholder="Type"
                        {...register("type", { required: true })}
                        className="mb-4 p-2 w-full border rounded"
                    />
                    {errors.type && <p className="text-red-500">Type is required.</p>}

                    <input
                        type="text"
                        placeholder="Longitude"
                        {...register("longtitude", { required: true })}
                        className="mb-4 p-2 w-full border rounded"
                    />
                    {errors.longtitude && <p className="text-red-500">Longitude is required.</p>}

                    <input
                        type="text"
                        placeholder="activityTime"
                        {...register("activityTime", { required: true })}
                        className="mb-4 p-2 w-full border rounded"
                    />
                    {errors.activityTime && <p className="text-red-500">Longitude is required.</p>}

                    <input
                        type="text"
                        placeholder="Latitude"
                        {...register("latitude", { required: true })}
                        className="mb-4 p-2 w-full border rounded"
                    />
                    {errors.latitude && <p className="text-red-500">Latitude is required.</p>}

                    <button
                        type="submit"
                        className="mt-6 text-white bg-red-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                    >
                        {buttonText}
                    </button>
                </form>

                <form className="max-w-sm mx-auto p-2 mt-6 bg-[#F4E9E9]">

                </form>
            </div>
        </div>
    );
}
