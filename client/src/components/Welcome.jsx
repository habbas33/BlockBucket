import React, {useContext, useEffect} from 'react'
import { ethers } from 'ethers';
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from '../context/TransactionContext';
import { PaymentContext } from '../context/PaymentContext';
import { shortenAddress } from "../utils/shortenAddress";
import {Loader} from './';

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none text-white border-none text-sm white-glassmorphism"
  />
);

export default function Welcome() {
  const { currentAccount, formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext);
  const { ownerAccount, plan, createPlan, handlePlanChange, isLoading: isPaymentLoading, subscription, getSubscriptionDetail, cancelSubscription, claim, getBalance, balance } = useContext(PaymentContext);
  
  const handlePaymentSubmit = (e) => {
    const { amount, duration } = plan;
    e.preventDefault(); //calling this to not reload if submit
    if ( !amount || !duration ) return;
    createPlan();
  };

 
  const handleCancelSubscription = (e) => {
    // e.preventDefault(); //calling this to not reload if submit
    cancelSubscription(subscription.plan);
  };

  const handleClaim = (e) => {
    // e.preventDefault(); //calling this to not reload if submit
    claim();
  };

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault(); //calling this to not reload if submit
    if (!addressTo || !amount || !keyword || !message) return;
    sendTransaction();
  };

  useEffect(() => {
    getSubscriptionDetail(currentAccount);
    getBalance();
    console.log("owner account =", typeof(ownerAccount), ownerAccount);
    console.log("current account = ",typeof(currentAccount), currentAccount);
  }, [currentAccount])
  
  return (
    <div className="flex w-full flex-col justify-center items-center px-5 lg:px-40 md:px-20">
      {ownerAccount != "" && (ownerAccount.toUpperCase() == currentAccount.toUpperCase()) && (
        <div className="flex mf:flex-row flex-col items-start justify-between  md:py-20 py-20">
          <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
              Create 
              <br />
              subscription plans
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Only owner of the subcription plan is allowed to create a plan.
            </p>
           
          </div>
          
          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handlePlanChange} />
              <Input placeholder="Duration (days)" name="duration" type="number" handleChange={handlePlanChange} />

              <div className="h-[0.25px] w-full bg-gray-600 my-2" />

              {isPaymentLoading
                ? <Loader />
                : (
                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    className="text-white w-full mt-2 border-[1px] p-2 bg-[#495c8d] border-[#495c8d] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Submit
                  </button>
                )}
            </div>
          </div>
         
        </div>
      )}
      
      {ownerAccount && (ownerAccount.toUpperCase() == currentAccount.toUpperCase()) && (
      <div className="flex flex-1  w-2/5  justify-center bg-[#1a3a42]  rounded-xl items-center flex-row  mf:mr-10">
          <p className="text-left m-5 p-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Contract Balance is {(balance)} ETH
            </p>
            <button
              type="button"
              onClick={handleClaim}
              className="text-white w-2/5 m-5 p-2 border-[1px] bg-[#495c8d] border-[#495c8d] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            >
              Claim
            </button>
        </div>
      )}
      {subscription.isSubscribed && (
        <div className="flex justify-between md:items-start items-center md:flex-row flex-col py-20 ">
          <div className="p-3 flex justify-center items-start flex-col rounded-xl h-48 w-full lg:w-96 md:w-72 eth-card .white-glassmorphism  ">
            <div className="flex justify-between flex-col w-full h-full">
              {/* <div className="flex justify-center items-center flex-row w-full h-full"> */}
                <p className="text-lg text-center sm:text-lg text-[#000000]">
                  {subscription.subscriber?"Subscribed":""} to
                </p>
                <p className="text-3xl text-center sm:text-3xl text-[#000000]">
                  {subscription.plan == 2? "Silver Plan" : subscription.plan == 3? "Gold Plan" :"Diamond Plan"}
                </p>  
              {/* </div> */}
              <p className="text-base sm:text-base text-[#000000]">
                Valid until {new Date(subscription.endTimestamp * 1000).toLocaleString()}
              </p>
            </div>
            <p onClick = {handleCancelSubscription} className="text-sm text-right sm:text-sm text-[#972d2d] hover:text-[#741111] cursor-pointer">
              Cancel subscription
            </p>
          </div>

          <div className="flex flex-col items-center justify-center  my-5 md:my-0 md:mx-5">
            <div className="p-5 lg:w-96 md:w-72 w-full flex flex-col justify-center items-center blue-glassmorphism">
              <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
              <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
              <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
              <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

              <div className="h-[1px] w-full bg-gray-400 my-2" />

              {isLoading
                ? <Loader />
                : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Send now
                  </button>
                )}
            </div>
          </div>
        </div>
       
      )}
      
    </div>

  )
}
