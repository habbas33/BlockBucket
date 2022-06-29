import React from "react";
import { SiTwitter, SiGithub, SiGmail, SiLinkedin } from "react-icons/si";
// import { FiGithub } from "react-icons/fi";

import logo from "../../images/logo.png";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-center items-center flex-col px-5 lg:px-40 md:px-20 y-4 gradient-bg-footer">
    <div className="sm:w-[100%] w-full h-[0.25px] bg-gray-400 mt-5 " />
    
    <div className="w-full flex sm:flex-row flex-col justify-between  my-4">
      <div className="flex min-w-max flex-[0.3] justify-center sm:items-center">
        <img src={logo} alt="logo" className="h-12" />
      </div>
      {/* <div className="flex flex-[0.4] justify-center items-center flex-wrap sm:mt-0 mt-5 w-full"></div>
      <div className="flex flex-[0.4] justify-center items-center flex-wrap sm:mt-0 mt-5 w-full">
        <p className="text-white text-base text-center mx-2 cursor-pointer">Market</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">Tutorials</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">Wallets</p>
      </div>
    </div> */}
    <div className="flex flex-[0.4] justify-center items-center flex-wrap sm:mt-0 mt-5 w-full"></div>

    <div className="sm:w-[90%] flex-[0.7] flex justify-center items-center flex-col">
      <div className="flex flex-row sm:justify-end justify-center items-center flex-wrap sm:mt-0 sm:mt-5 mt-2 w-full">
        <div className={`w-8 h-8 rounded-full flex justify-center mx-1 items-center bg-[#222831] hover:bg-[#444]`}>
          <a href="https://twitter.com/bearSurvivor"><SiTwitter fontSize={18} color="#fff"/></a>
        </div>
        <div className={`w-8 h-8 rounded-full flex justify-center mx-1 items-center bg-[#222831] hover:bg-[#444]`}>
          <a href="https://github.com/habbas33"><SiGithub fontSize={18} color="#fff"/></a>
        </div>
        <div className={`w-8 h-8 rounded-full flex justify-center mx-1 items-center bg-[#222831] hover:bg-[#444]`}>
          <a href="https://www.linkedin.com/in/habbas33"><SiLinkedin fontSize={18} color="#fff"/></a>
        </div>
        <div className={`w-8 h-8 rounded-full flex justify-center mx-1 items-center bg-[#222831] hover:bg-[#444]`}>
          <a href="mailto:habbas33@gmail.com"><SiGmail fontSize={18} color="#fff"/></a>
        </div>
      </div>
      
      
    </div>

    </div>
    <p className="text-white text-sm font-light  mt-2 text-center">Copyright © 2022 Bear Survivor • Frontend React Engineer & Solidity Developer</p>
  </div>
);

export default Footer;