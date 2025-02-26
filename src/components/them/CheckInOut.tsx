// "use client";

// import Button from "@/components/commons/Button/Button";
// import { sendDelayedContent, useCheckInOutAccount, useDailyData } from "@/hooks/useActity";
// import { useEmployeDetail } from "@/hooks/useEmploye";

// import {
//     ActivitySchema,
//     ActivityType,
//     SendDelayedSchema,
//     sendDelayedType,
// } from "@/lib/schemaValidations/activity.schema";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";


// export default function CheckInOut() {
//     const router = useRouter();

//     const handleRedirect = () => {
//         router.push('/log-task');
//     };

//     const username = useSelector((state: any) => state.auth?.username)
//     const empId = useSelector((state: any) => state.auth?.userId)
//     // CHECKINOUT ACCOUNT
//     const [isLoadingCheckInOut, setLoadingCheckInOut] = useState(false);
//     const { data, error, isLoading, mutateData } = useEmployeDetail(empId);

//     const {
//         data: getDailyData1,
//         error: errortDailyData1,
//         isLoading: isLoadingtDailyData1,
//         mutateData: mutateDailyData1
//     } = useDailyData(empId);
//     const getTypeCHeckOut = getDailyData1?.data.lastestCheckOut?.activityType;
//     const getTypeCHeckIn = getDailyData1?.data.earliestCheckIn?.activityType;

//     const getInitialCheckInStatus = () => {
//         if (getTypeCHeckIn == undefined || getTypeCHeckIn == null) {
//             return false;
//         } else if (
//             (getTypeCHeckOut == undefined || getTypeCHeckOut == null) &&
//             (getTypeCHeckIn == undefined || getTypeCHeckIn == null)
//         ) {
//             return false;
//         } else {
//             true;
//         }
//     };

//     const [isCheckedIn, setIsCheckedIn] = useState(getInitialCheckInStatus);

//     useEffect(() => {
//         if (getTypeCHeckIn == undefined || getTypeCHeckIn == null) {
//             setIsCheckedIn(false);
//         }
//         if (
//             (getTypeCHeckOut == undefined || getTypeCHeckOut == null) &&
//             (getTypeCHeckIn == undefined || getTypeCHeckIn == null)
//         ) {
//             setIsCheckedIn(false);
//         } else {
//             setIsCheckedIn(true);
//         }
//     }, [getTypeCHeckOut, getTypeCHeckIn]);

//     const formMethods = useForm<ActivityType>({
//         resolver: yupResolver(ActivitySchema),
//     });

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = formMethods;

//     // const handleCheckInOut = async (formData: ActivityType, type: number) => {
//     //     if (typeof window !== "undefined" && navigator.geolocation) {
//     //         setLoadingCheckInOut(true);
//     //         navigator.geolocation.getCurrentPosition(
//     //             async (position) => {
//     //                 const latitude = position.coords.latitude;
//     //                 const longitude = position.coords.longitude;

//     //                 try {
//     //                     const checkInOut = useCheckInOutAccount();
//     //                     const response = await checkInOut({
//     //                         ...formData,
//     //                         empId: data?.data?.empId,
//     //                         type,
//     //                         activityTime: new Date().toTimeString().split(" ")[0],
//     //                         deviceId: "abc",
//     //                         longtitude: longitude,
//     //                         latitude: latitude,
//     //                     });

//     //                     if (response.code === 200) {
//     //                         setIsCheckedIn(true);
//     //                         console.log(response.data);
//     //                         mutateDailyData1();
//     //                         toast.success(response.data);
//     //                     }
//     //                 } catch (error: any) {
//     //                     console.error(
//     //                         "Axios Error:",
//     //                         error.response?.data.errorMessage
//     //                     );
//     //                 } finally {
//     //                     setLoadingCheckInOut(false);
//     //                 }
//     //             },
//     //             (error) => {
//     //                 console.error("Error Code:", error.code);
//     //                 console.error("Error note:", error.message);
//     //                 setLoadingCheckInOut(false);
//     //             }
//     //         );
//     //     } else {
//     //         console.error("Geolocation is not supported by this browser.");
//     //     }
//     // };


//     const getPositionCHeck = (): Promise<GeolocationPosition> => {
//         return new Promise((resolve, reject) => {
//             navigator.geolocation.getCurrentPosition(resolve, reject);
//         });
//     };

//     const handleCheckInOut = async (formData: ActivityType, type: number) => {
//         if (typeof window !== "undefined" && navigator.geolocation) {
//             setLoadingCheckInOut(true);
//             try {
//                 const position = await getPositionCHeck(); // Đợi lấy tọa độ
//                 const latitude = position.coords.latitude;
//                 const longitude = position.coords.longitude;

//                 const checkInOut = useCheckInOutAccount();
//                 const response = await checkInOut({
//                     ...formData,
//                     empId: data?.data?.empId,
//                     type, // Loại check-in/check-out
//                     activityTime: new Date().toTimeString().split(" ")[0],
//                     deviceId: "abc",
//                     longtitude: longitude,
//                     latitude: latitude,
//                 });

//                 if (response.code === 200) {
//                     setIsCheckedIn(true); // Cập nhật trạng thái đã check-in
//                     console.log(response.data);
//                     mutateDailyData1(); // Làm mới dữ liệu
//                     toast.success(response.data); // Thông báo thành công
//                 }
//             } catch (error: any) {
//                 if (error.code) {
//                     console.error("Geolocation Error Code:", error.code);
//                     console.error("Geolocation Error Message:", error.message);
//                 } else {
//                     console.error("API Error:", error.response?.data.errorMessage);
//                 }
//             } finally {
//                 setLoadingCheckInOut(false); // Tắt trạng thái loading
//             }
//         } else {
//             console.error("Geolocation is not supported by this browser.");
//         }
//     };

//     const onSubmitCheckIn = async (formData: ActivityType) => {
//         await handleCheckInOut(formData, 0);
//     };

//     const onSubmitCheckOut = async (formData: ActivityType) => {
//         await handleCheckInOut(formData, 1);
//     };

//     // CHECK IN BREAK
//     const getTypeBreakStart =
//         getDailyData1?.data.breakStartList?.[
//             getDailyData1.data.breakStartList.length - 1
//         ]?.activityType;
//     const getTypeBreakEnd =
//         getDailyData1?.data.breakEndList?.[
//             getDailyData1.data.breakEndList.length - 1
//         ]?.activityType;
//     const getTypeBreakStartId =
//         getDailyData1?.data.breakStartList?.[
//             getDailyData1.data.breakStartList.length - 1
//         ]?.id;
//     const getTypeBreakEndId =
//         getDailyData1?.data.breakEndList?.[
//             getDailyData1.data.breakEndList.length - 1
//         ]?.id;
//     const getInitialBreakStatus = () => {
//         if (getTypeBreakStart == undefined || getTypeBreakStart == null) {
//             return false;
//         } else if (
//             (getTypeBreakEnd == undefined || getTypeBreakEnd == null) &&
//             (getTypeBreakStart == undefined || getTypeBreakStart == null)
//         ) {
//             return false;
//         } else if (getTypeBreakStartId - getTypeBreakEndId === -1) {
//             return false;
//         } else {
//             true;
//         }
//     };

//     const [isCheckBreakStart, setIsTypeBreakStart] = useState(
//         getInitialBreakStatus
//     );

//     useEffect(() => {
//         if (getTypeBreakStart == undefined || getTypeBreakStart == null) {
//             setIsTypeBreakStart(false);
//         } else if (
//             (getTypeBreakEnd == undefined || getTypeBreakEnd == null) &&
//             (getTypeBreakStart == undefined || getTypeBreakStart == null)
//         ) {
//             setIsTypeBreakStart(false);
//         } else if (getTypeBreakStartId - getTypeBreakEndId === -1) {
//             setIsTypeBreakStart(false);
//         } else {
//             setIsTypeBreakStart(true);
//         }
//     }, [
//         getTypeBreakStart,
//         getTypeBreakEnd,
//         getTypeBreakStartId,
//         getTypeBreakEndId,
//     ]);

//     // const onSubmitBreakStart = async (formData: ActivityType) => {
//     //     if (typeof window !== "undefined" && navigator.geolocation) {
//     //         navigator.geolocation.getCurrentPosition(
//     //             async (position) => {
//     //                 console.log(position.coords.latitude, position.coords.latitude)
//     //                 const latitude = position.coords.latitude;
//     //                 const longitude = position.coords.longitude;
//     //                 try {
//     //                     const checkInOut = useCheckInOutAccount();
//     //                     const response = await checkInOut({
//     //                         ...formData,
//     //                         empId: data?.data?.empId,
//     //                         type: 2,
//     //                         activityTime: new Date().toTimeString().split(" ")[0],
//     //                         longtitude: longitude,
//     //                         latitude: latitude,
//     //                         deviceId: "abc",
//     //                     });

//     //                     if (response.code === 200) {
//     //                         mutateData();
//     //                         mutateDailyData1();
//     //                         setIsTypeBreakStart(true);
//     //                         toast.success(response.data);
//     //                     }
//     //                 } catch (error: any) {
//     //                     console.log(error.status);
//     //                 } finally {
//     //                     // setLoadingCheckInOut(false);
//     //                 }
//     //             },
//     //             (error) => {
//     //                 console.error("Error Code:", error.code);
//     //                 console.error("Error Message:", error.message);
//     //                 // setLoadingCheckInOut(false);
//     //             }
//     //         );
//     //     } else {
//     //         console.error("Geolocation is not supported by this browser.");
//     //     }
//     // };


//     const getPosition = (): Promise<GeolocationPosition> => {
//         return new Promise((resolve, reject) => {
//             navigator.geolocation.getCurrentPosition(resolve, reject);
//         });
//     };

//     const onSubmitBreakStart = async (formData: ActivityType) => {
//         if (typeof window !== "undefined" && navigator.geolocation) {
//             try {
//                 const position = await getPosition(); // Đợi lấy tọa độ
//                 const latitude = position.coords.latitude;
//                 const longitude = position.coords.longitude;

//                 console.log("Latitude:", latitude, "Longitude:", longitude);

//                 const checkInOut = useCheckInOutAccount();
//                 const response = await checkInOut({
//                     ...formData,
//                     empId: data?.data?.empId,
//                     type: 2,
//                     activityTime: new Date().toTimeString().split(" ")[0],
//                     longtitude: longitude,
//                     latitude: latitude,
//                     deviceId: "abc",
//                 });

//                 if (response.code === 200) {
//                     mutateData();
//                     mutateDailyData1();
//                     setIsTypeBreakStart(true);
//                     toast.success(response.data);
//                 }
//             } catch (error: any) {
//                 if (error.code) {
//                     console.error("Geolocation Error Code:", error.code);
//                     console.error("Geolocation Error Message:", error.message);
//                 } else {
//                     console.log("API Error:", error);
//                 }
//             } finally {
//                 // Xử lý kết thúc (nếu cần)
//                 // setLoadingCheckInOut(false);
//             }
//         } else {
//             console.error("Geolocation is not supported by this browser.");
//         }
//     };

//     // const onSubmitBreakEnd = async (formData: ActivityType) => {
//     //     if (typeof window !== "undefined" && navigator.geolocation) {
//     //         navigator.geolocation.getCurrentPosition(
//     //             async (position) => {
//     //                 const latitude = position.coords.latitude;
//     //                 const longitude = position.coords.longitude;
//     //                 try {
//     //                     const checkInOut = useCheckInOutAccount();
//     //                     const response = await checkInOut({
//     //                         ...formData,
//     //                         empId: data?.data?.empId,
//     //                         type: 3,
//     //                         activityTime: new Date().toTimeString().split(" ")[0],
//     //                         longtitude: longitude,
//     //                         latitude: latitude,
//     //                         deviceId: "abc",
//     //                     });

//     //                     if (response.code === 200) {
//     //                         setIsTypeBreakStart(false);
//     //                         mutateDailyData1();
//     //                         toast.success(response.data);
//     //                     }
//     //                     // setIsTypeBreakStart(true);
//     //                 } catch (error: any) {
//     //                     console.log(error.status);
//     //                 } finally {
//     //                     // setLoadingCheckInOut(false);
//     //                 }
//     //             },
//     //             (error) => {
//     //                 console.error("Error Code:", error.code);
//     //                 console.error("Error Message:", error.message);
//     //                 // setLoadingCheckInOut(false);
//     //             }
//     //         );
//     //     } else {
//     //         console.error("Geolocation is not supported by this browser.");
//     //     }
//     // };
//     // SENDREQUEST
//     const onSubmitBreakEnd = async (formData: ActivityType) => {
//         if (typeof window !== "undefined" && navigator.geolocation) {
//             try {
//                 const position = await getPosition();
//                 const latitude = position.coords.latitude;
//                 const longitude = position.coords.longitude;

//                 console.log("Latitude:", latitude, "Longitude:", longitude);

//                 const checkInOut = useCheckInOutAccount();
//                 const response = await checkInOut({
//                     ...formData,
//                     empId: data?.data?.empId,
//                     type: 3,
//                     activityTime: new Date().toTimeString().split(" ")[0],
//                     longtitude: longitude,
//                     latitude: latitude,
//                     deviceId: "abc",
//                 });

//                 if (response.code === 200) {
//                     setIsTypeBreakStart(false);
//                     mutateDailyData1();
//                     toast.success(response.data);
//                 }
//             } catch (error: any) {
//                 if (error.code) {
//                     console.error("Geolocation Error Code:", error.code);
//                     console.error("Geolocation Error Message:", error.message);
//                 } else {
//                     console.log("API Error:", error);
//                 }
//             } finally {
//                 // Bất kỳ thao tác dọn dẹp nào khác nếu cần
//             }
//         } else {
//             console.error("Geolocation is not supported by this browser.");
//         }
//     };


//     const formSendDelay = useForm<sendDelayedType>({
//         resolver: yupResolver(SendDelayedSchema),
//     });

//     const {
//         register: registerSendRequest,
//         handleSubmit: handleSubmitSendRequest,
//         formState: { errors: errorsSendRequest },
//         reset: resetSendRequest,
//     } = formSendDelay;

//     const onSubmitSendRequest = async (formData: sendDelayedType) => {
//         const sendContent = sendDelayedContent();
//         try {
//             const response = await sendContent(empId, { ...formData });
//             toast.success(response.data);
//         } catch (error: any) {
//             console.log(error.status);
//         }
//     };

//     const mergedBreakList = [
//         ...getDailyData1?.data.breakStartList.map((item: any) => ({
//             ...item,
//             type: "breakStart"
//         })) || [],
//         ...getDailyData1?.data.breakEndList.map((item: any) => ({
//             ...item,
//             type: "breakEnd"
//         })) || []
//     ].sort((a: any, b: any) => b.id - a.id);

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//                 <div className="flex justify-center mb-4">
//                     <Image
//                         src="/assets/images/fulllogo_pgt.png"
//                         alt="logo"
//                         width={200}
//                         height={200}
//                     />
//                 </div>
//                 <h1 className="text-center text-xl font-bold mb-4 text-red-300">
//                     {data ? data.data.fullName : "Loading..."}
//                 </h1>
//                 <button
//                     className="mt-6 text-white bg-red-300 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
//                     onClick={handleRedirect}
//                 >
//                     Logtask
//                 </button>

//                 <div className="">
//                     {(() => {
//                         if (isCheckBreakStart === true) {
//                             return (
//                                 <button
//                                     onClick={handleSubmit(onSubmitBreakEnd)}
//                                     type="button"
//                                     className="mt-6 text-white bg-red-300 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
//                                 >
//                                     Break End
//                                 </button>
//                             );
//                         } else {
//                             return (
//                                 <button
//                                     onClick={handleSubmit(onSubmitBreakStart)}
//                                     type="button"
//                                     className="mt-6 text-white bg-red-300 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
//                                 >
//                                     Break Start
//                                 </button>
//                             );
//                         }
//                     })()}
//                 </div>

//                 <div className="">
//                     {(() => {
//                         if (isCheckedIn === true) {
//                             return (
//                                 <Button
//                                     onClick={handleSubmit(onSubmitCheckOut)}
//                                     type="submit"
//                                     className=" bg-gradient-to-b from-blue-700 to-pink-500 mt-6 text-white  focus:outline-none  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
//                                 // isLoading={isLoadingCheckInOut}
//                                 // disabled={isLoadingCheckInOut}
//                                 >
//                                     Check-out
//                                 </Button>
//                             );
//                         } else {
//                             return (
//                                 <Button
//                                     onClick={handleSubmit(onSubmitCheckIn)}
//                                     type="submit"
//                                     className="mt-6 text-white bg-red-300 focus:outline-none  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
//                                 // isLoading={isLoadingCheckInOut}
//                                 // disabled={isLoadingCheckInOut}
//                                 >
//                                     Check-in
//                                 </Button>
//                             );
//                         }
//                     })()}
//                 </div>

//                 <div className="flex flex-col w-full gap-5 mt-4">
//                     <div className="flex">
//                         <span className="flex-1">
//                             Đã check-in:{getDailyData1?.data.earliestCheckIn?.activityTime}
//                         </span>
//                         <span className="flex-1 ">Locations: {getDailyData1?.data.earliestCheckIn?.longtitude} {getDailyData1?.data.earliestCheckIn?.latitude}</span>
//                     </div>

//                     <div className="flex">
//                         <span className="flex-1">Đã check-out: {getDailyData1?.data.lastestCheckOut?.activityTime}</span>
//                         <span className="flex-1">Locations {getDailyData1?.data.lastestCheckOut?.longtitude} {getDailyData1?.data.lastestCheckOut?.latitude}</span>
//                     </div>

//                     <div className="flex flex-col gap-5">
//                         {mergedBreakList.map((item: any, index: number) => (
//                             <div key={index} className="flex">
//                                 <span className="flex-1">
//                                     {item.type === "breakStart" ? "Đã ra ngoài: " : "Đã quay về: "} {item.activityTime}
//                                 </span>
//                                 <span className="flex-1">
//                                     Location: {item.longtitude} {item.latitude}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <form
//                     className="max-w-sm mx-auto p-2 mt-6 bg-[#F4E9E9] w-md"
//                     onSubmit={handleSubmitSendRequest(onSubmitSendRequest)}
//                 >
//                     <select
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/2 p-1"
//                         {...registerSendRequest("type", { required: true })}>
//                         <option value="">Select note</option>
//                         <option value="0">Check-in late</option>
//                         <option value="1">Check-out early</option>
//                         <option value="2">Out of office</option>
//                     </select>
//                     {errorsSendRequest.type && (
//                         <span className="text-red-500 text-sm">Choose Status</span>
//                     )}

//                     <div className="flex mt-3">
//                         <textarea
//                             id="message"
//                             rows={2}
//                             className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border"
//                             placeholder="Write your thoughts here..."
//                             {...registerSendRequest("note", { required: true })}
//                         />
//                         {errorsSendRequest.note && (
//                             <span className="text-red-500 text-sm">
//                                 This field is required
//                             </span>
//                         )}
//                         <button type="submit" className="ml-2">
//                             <Image
//                                 height={50}
//                                 width={50}
//                                 src="/assets/images/fulllogo_pgt.png"
//                                 alt="Submit"
//                             />
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
