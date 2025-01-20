// import React, { useState } from 'react'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets'

// const Navbar = () => {

//     const [showMenu,setShowMenu]=useState(false)
//     const [token,setToken]=useState(true);


//     const navigate=useNavigate();
//     return (
//         <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-500'>
//             <div className='flex items-center'>
//             <img onClick={()=>navigate(`/`)} className='w-8 h-8 sm:w-10 sm:h-10' src={assets.hospital_icon} alt="" />
//             <h1 onClick={()=>navigate(`/`)} className='cursor-pointer text-xl font-bold ml-3'>Hospital</h1>
//             </div>
//             <ul className='hidden md:flex items-start gap-5 font-medium'>
//                 <NavLink to='/'>
//                     <li className='py-1'>Home</li>  
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//                 <NavLink to='/doctors'>
//                     <li className='py-1'>All Doctors</li>
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
//                 </NavLink>
//                 <NavLink to='/about'>
//                     <li className='py-1'>About</li>
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
//                 </NavLink>
//                 <NavLink to='/contact'>
//                     <li className='py-1'>Contact</li>
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
//                 </NavLink>
//             </ul>
//             <div className='flex items-center gap-4'>
//                 {
//                     token 
//                     ?
//                         <div className='flex items-center gap-2 cursor-pointer group relative'>
//                             <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
//                             <img className='w-2.5' src={assets.dropdown_icon} alt="" />
//                             <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block'>
//                                 <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
//                                     <p onClick={()=>navigate('/myprofile')} className='hover:text-black cursor-pointer'>My Profile</p>
//                                     <p onClick={()=>navigate('/myappointment')} className='hover:text-black cursor-pointer'>My Appointmnet</p>
//                                     <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
//                                 </div>
//                             </div>
//                         </div>
//                     :
//                     <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
//                 }
                
//             </div>
//         </div>
//     )
// }

// export default Navbar


import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {token,setToken}=useContext(AppContext)
  const navigate = useNavigate();

  const logout=()=>{
    setToken(false)
    localStorage.removeItem("token")
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300  text-black font-bold px-4 md:px-10 lg:px-20">
      {/* Logo and Title */}
      <div className="flex items-center">
        <img
          onClick={() => navigate(`/`)}
          className="w-16 h-10 sm:w-20 sm:h-16 cursor-pointer"
          src={assets.hospitalLogo}
          alt=""
        />
        {/* <h1
          onClick={() => navigate(`/`)}
          className="cursor-pointer text-xl font-bold ml-3"
        >
          NovaCare
        </h1> */}
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/" className="hover:text-primary">
          <li className="py-1">Home</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to="/doctors" className="hover:text-primary">
          <li className="py-1">All Doctors</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to="/about" className="hover:text-primary">
          <li className="py-1">About</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to="/contact" className="hover:text-primary">
          <li className="py-1">Contact</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="block md:hidden"
        onClick={() => setShowMenu(!showMenu)}
      >
        <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
      </button>

      

      {/* Mobile Menu */}
      {showMenu && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden z-10">
          <NavLink
            to="/"
            className="hover:text-primary"
            onClick={() => setShowMenu(false)}
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/doctors"
            className="hover:text-primary"
            onClick={() => setShowMenu(false)}
          >
            <li>All Doctors</li>
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-primary"
            onClick={() => setShowMenu(false)}
          >
            <li>About</li>
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-primary"
            onClick={() => setShowMenu(false)}
          >
            <li>Contact</li>
          </NavLink>
         

          {/* <div className='flex items-center gap-4'>
                 {
                    token 
                    ?
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={()=>{navigate('/myprofile')} }className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={()=>{navigate('/myappointment')}} className='hover:text-black cursor-pointer'>My Appointmnet</p>
                                    <p onClick={()=>{logout(); navigate("/")}}  className='hover:text-black cursor-pointer'>Logout  </p>
                                </div>
                            </div>
                        </div>
                    :
                    <button onClick={()=>{navigate('/login'); setShowMenu(false)}} className='bg-primary text-white px-3 py-3 rounded-full font-light'>Create Account</button>
                }
                
            </div> */}
            </ul>
          )}

          {/* Dropdown/Profile Section */}
      <div className='flex items-center gap-4'>
              {
                    token 
                    ?
                        <div className='flex items-center gap-2 cursor-pointer group relative z-10'>
                            <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                            <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={()=>navigate('/myprofile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={()=>navigate('/myappointment')} className='hover:text-black cursor-pointer'>My Appointmnet</p>
                                    <p onClick={()=>{logout(); navigate("/")}} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                    :
                    <button onClick={()=>{navigate('/login')}} className='bg-black hover:bg-primary hover:text-white text-white  rounded-full font-bold block md:px-6 md:py-4 md:text-base text-xl sm:hover:bg-primary sm:px-6 sm:py-2'>Create Account</button>
                }

            </div>
      
    </div>
  );
};

export default Navbar;
