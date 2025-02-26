// "use client";

// import {
//   ActivitySchema,
//   ActivityType,
//   EmployeeType,
// } from "@/schemaValidations/attendance.schema";
// import { useAttendanceQuery } from "@/swr/useAttendance";
// import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";
// import Image from "next/image";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// export default function Page() {
//   const [data, setData] = useState<EmployeeType | null>(null);
//   const [buttonText, setButtonText] = useState("Log Task");
//   const useAttendanceQuery1 = useAttendanceQuery(8);
//   console.log(useAttendanceQuery1.data + "useAttendanceQuery1");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<ActivityType>({
//     resolver: yupResolver(ActivitySchema),
//     defaultValues: {
//       empId: 0,
//       type: 2,
//       activityTime: "8:30:00",
//       longtitude: 105.793605,
//       latitude: 21.0383251,
//     },
//   });

//   // useEffect(() => {
//   //     const fetchData = async () => {
//   //         const url = "http://192.168.90.23:7026/api/Employee/8";
//   //         try {
//   //             const response = await axios.get(url);
//   //             const employeeData = response.data.data;
//   //             console.log(employeeData + "22222")
//   //             setData(employeeData);
//   //             reset({
//   //                 empId: employeeData.empId,
//   //                 type: employeeData.type,
//   //                 longtitude: employeeData.longitude,
//   //                 latitude: employeeData.latitude,
//   //             });
//   //         } catch (error) {
//   //             console.error("Error fetching data:", error);
//   //         }
//   //     };
//   //     fetchData();
//   // }, [reset]);

//   const onSubmit = async (formData: ActivityType) => {
//     try {
//       const url = "https://1ed9-222-252-26-35.ngrok-free.app/api/Activity";
//       const token =
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjgiLCJOYW1lIjoiTGluaCIsIkVtYWlsIjoibGluaEBnbWFpbC5jb20iLCJSb2xlcyI6WyJST0xFX0FETUlOIiwiUk9MRV9FTVBMT1lFRSJdLCJleHAiOjE3MzAyNjIyMTMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxNzMiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MTczIn0.9wWda-0SxvhTZHYriWe6PUCnBFyc4Mt_LiA8PvH2vEU";

//       const response = await axios.post(url, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("Data sent successfully:", response.data);
//       setButtonText("Back to Work");
//       reset();
//     } catch (error) {
//       console.error("Error sending data:", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <div className="flex justify-center mb-4">
//           <Image
//             src="/assets/images/fulllogo_pgt.png"
//             alt="logo"
//             width={200}
//             height={200}
//           />
//         </div>
//         <h1 className="text-center text-xl font-bold mb-4 text-red-300">
//           {data ? data.fullName : "Loading..."}
//         </h1>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <input
//             type="text"
//             placeholder="Employee ID"
//             {...register("empId", { required: true })}
//             className="mb-4 p-2 w-full border rounded"
//           />
//           {errors.empId && (
//             <p className="text-red-500">Employee ID is required.</p>
//           )}

//           <input
//             type="text"
//             placeholder="Type"
//             {...register("type", { required: true })}
//             className="mb-4 p-2 w-full border rounded"
//           />
//           {errors.type && <p className="text-red-500">Type is required.</p>}

//           <input
//             type="text"
//             placeholder="Longitude"
//             {...register("longtitude", { required: true })}
//             className="mb-4 p-2 w-full border rounded"
//           />
//           {errors.longtitude && (
//             <p className="text-red-500">Longitude is required.</p>
//           )}

//           <input
//             type="text"
//             placeholder="activityTime"
//             {...register("activityTime", { required: true })}
//             className="mb-4 p-2 w-full border rounded"
//           />
//           {errors.activityTime && (
//             <p className="text-red-500">Longitude is required.</p>
//           )}

//           <input
//             type="text"
//             placeholder="Latitude"
//             {...register("latitude", { required: true })}
//             className="mb-4 p-2 w-full border rounded"
//           />
//           {errors.latitude && (
//             <p className="text-red-500">Latitude is required.</p>
//           )}

//           <button
//             type="submit"
//             className="mt-6 text-white bg-red-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
//           >
//             {buttonText}
//           </button>
//         </form>

//         <button
//           type="submit"
//           className="mt-6 text-white bg-red-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
//         >
//           Out of Office
//         </button>

//         {/* <form >
//                     <button
//                         type="submit"
//                         className="mt-6 text-white bg-red-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
//                     >
//                         Out of Office
//                     </button>
//                 </form> */}

//         <form>
//           <button
//             type="submit"
//             className="mt-6 text-white bg-red-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
//           >
//             Check-in
//           </button>
//         </form>

//         <form className="max-w-sm mx-auto p-2 mt-6 bg-[#F4E9E9]">
//           <select
//             id="countries"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-1/2 p-1 "
//           >
//             <option selected>Select note</option>
//             <option value="1">Check-in late</option>
//             <option value="2">Check-out early</option>
//             <option value="2">Out of office</option>
//           </select>

//           <div className="flex mt-3">
//             <textarea
//               id="message"
//               rows={2}
//               className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border "
//               placeholder="Write your thoughts here..."
//               defaultValue={""}
//             />
//             <button>
//               <Image
//                 height={50}
//                 width={50}
//                 src="/assets/images/fulllogo_pgt.png"
//                 alt=""
//               />
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

export default function page() {
  return <div>page</div>;
}
