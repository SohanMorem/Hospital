// import React, { useContext } from "react";
// import { AppContext } from "../context/AppContext";


// const MyAppointment = () => {

//   const {doctors}=useContext(AppContext)
  

//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       <div className="container mx-auto">
//         {/* Page Title */}
//         <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

//         {/* Appointments List */}
//         <div className="space-y-6">
//           {doctors.slice(0,3).map((appointment,index) => (
//             <div
//               key={index}
//               className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center md:justify-between"
//             >
//               {/* Doctor Information */}
//               <div className="flex items-start md:items-center space-x-4">
//                 <img
//                   className="w-32 bg-indigo-50 object-cover"
//                   src={appointment.image}
//                   alt="Doctor"
//                 />
//                 <div>
//                   <h2 className="text-xl font-semibold">{appointment.name}</h2>
//                   <p className="text-gray-600">{appointment.speciality}</p>
//                   <p className="text-black">Address:</p>
//                   <p className="text-gray-600"> {appointment.address.line1}</p>
//                   <p className="text-gray-600"> {appointment.address.line2}</p>
//                   <p className="text-gray-600">
//                    <span className="text-black">Date & Time:</span>  14 Jan 2025 | 4:30 PM
//                   </p>
//                 </div>
//               </div>

//               {/* Actions */}
//                 <div className="flex flex-col gap-2 justify-end">
                  
//                   <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-primary hover:text-white transition-all duration-300">
//                   Pay Amount
//                 </button>
//                 <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-all duration-300">
//                   Cancel appointment
//                 </button>
//                 </div>
                
//               </div>
            
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };




// export default MyAppointment


// import React, { useContext } from "react";
// import { AppContext } from "../context/AppContext";

// const MyAppointment = () => {
//   const { doctors } = useContext(AppContext);

//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       <div className="container mx-auto">
//         {/* Page Title */}
//         <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
//           My Appointments
//         </h1>

//         {/* Appointments List */}
//         <div className="space-y-6">
//           {doctors.slice(0, 3).map((appointment, index) => (
//             <div
//               key={index}
//               className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between"
//             >
//               {/* Doctor Information */}
//               <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
//                 <img
//                   className="w-full md:w-32 h-[18rem] object-cover rounded-lg"
//                   src={appointment.image}
//                   alt="Doctor"
//                 />
//                 <div>
//                   <h2 className="text-xl font-semibold text-center md:text-left">
//                     {appointment.name}
//                   </h2>
//                   <p className="text-gray-600 text-center md:text-left">
//                     {appointment.speciality}
//                   </p>
//                   <p className="text-black text-center md:text-left">Address:</p>
//                   <p className="text-gray-600 text-center md:text-left">
//                     {appointment.address.line1}
//                   </p>
//                   <p className="text-gray-600 text-center md:text-left">
//                     {appointment.address.line2}
//                   </p>
//                   <p className="text-gray-600 text-center md:text-left">
//                     <span className="text-black">Date & Time:</span> 14 Jan 2025 | 4:30 PM
//                   </p>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-2 items-stretch md:items-end">
//                 <button className="w-full md:w-auto bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-primary hover:text-white transition-all duration-300">
//                   Pay Amount
//                 </button>
//                 <button className="w-full md:w-auto bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-all duration-300">
//                   Cancel Appointment
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyAppointment;


import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          My Appointments
        </h1>

        {/* Appointments List */}
        <div className="space-y-6">
          {doctors.slice(0, 3).map((appointment, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row sm:items-start lg:items-center justify-between"
            >
              {/* Doctor Information */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-3/4">
                <img
                  className="w-full sm:w-36 md:w-48 h-[14rem] md:h-56 object-cover rounded-lg"
                  src={appointment.image}
                  alt="Doctor"
                />
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-semibold text-center sm:text-left">
                    {appointment.name}
                  </h2>
                  <p className="text-gray-600 text-center sm:text-left">
                    {appointment.speciality}
                  </p>
                  <p className="text-black text-center sm:text-left mt-2">Address:</p>
                  <p className="text-gray-600 text-center sm:text-left">
                    {appointment.address.line1}
                  </p>
                  <p className="text-gray-600 text-center sm:text-left">
                    {appointment.address.line2}
                  </p>
                  <p className="text-gray-600 text-center sm:text-left mt-2">
                    <span className="text-black">Date & Time:</span> 14 Jan 2025 | 4:30 PM
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch sm:items-center">
                <button className="w-full sm:w-auto bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Amount
                </button>
                <button className="w-full sm:w-auto bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;

