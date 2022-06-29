import React, {useContext} from 'react'
import { HiMenuAlt4 } from "react-icons/hi";
import { SiEthereum } from "react-icons/si";
import { AiOutlineClose, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from "../utils/shortenAddress";

import logo from '../../images/logo.png';

const NavbarItem = ({ title, classProps}) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      {title}
    </li>
  );
}

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const { connectWallet, disconnectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext);
 
  return (
    <nav className="w-full flex md:justify-center justify-between items-center px-5 lg:px-40 md:px-20 py-5">
      <div className="md:flex-[0.7] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-60 cursor-pointer" />
      </div>
      
      {/* <div className="md:flex-[0.3] flex-initial justify-end items-center">
        <p className="text-white font-light text-sm">
          {shortenAddress(currentAccount)}
        </p>
      </div> */}
      <div className="md:flex-[0.3] flex-initial justify-end items-center">
        
        <ul className="text-white md:flex hidden list-none flex-row justify-evenly items-center flex-initial">
          {/* {[].map((item, index) => (
            <NavbarItem key={item+index} title={item}/>
          ))} */}
          
          <li className={`mx-4 cursor-pointer`}>
          {currentAccount && (
            <div className="w-8 h-8 rounded-full border-2 border-light flex justify-center items-center">
              <SiEthereum fontSize={18} color="#8792C0" />
            </div>
          )}
          </li>
          <li className={`mr-4 cursor-pointer`}>
            <p className="text-white font-light text-base">
              {shortenAddress(currentAccount)}
            </p>
          </li>
          
          {!currentAccount ? (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#495c8d] p-3 rounded-full cursor-pointer hover:bg-[#3d4f7c]"
            >
              <AiOutlineLogin className="text-white mr-2" />
              <p className="text-white text-base font-semibold mr-2">
                Connect Wallet
              </p>
            </button>
          ):(
            <button
            type="button"
            onClick={disconnectWallet}
            className="flex flex-row justify-center items-center my-5 bg-[#495c8d] p-3 rounded-full cursor-pointer hover:bg-[#3d4f7c]"
          >
            <AiOutlineLogout className="text-white mr-2" />
            <p className="text-white text-base font-semibold  mr-2">
              Disconnect
            </p>
          </button>
          )}
        </ul>
      </div>
      <div className="flex relative">
        {toggleMenu
          ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/>
          : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>
        }

        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justigy-start items-end rounded-md blue-glassmorphism text-white animate-slide-in
            "
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)}/>
            </li>
            {[].map((item, index) => (
            <NavbarItem key={item+index} title={item} classProps="my-2 text-lg"/>
        ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
