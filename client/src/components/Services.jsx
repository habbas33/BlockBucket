import React, {useContext} from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { ImSpades, ImHeart, ImClubs, ImDiamonds } from "react-icons/im";
import { PaymentContext } from '../context/PaymentContext';
import { TransactionContext } from '../context/TransactionContext';
import {Loader} from './';

const ServiceCard = ({ color, title, icon, planId, amount, duration, subtitle, handleSubscribe, isPaymentLoading }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color} `}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className={`mt-2 text-[#ffffff] text-2xl font-bold`}>{title}</h3>
      <br/>
      <p className="mt-1 text-white text-lg md:w-9/12">
        {amount}
      </p>
      <p className="mt-1 text-white text-lg md:w-9/12">
        {duration}
      </p>
      <br/>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
      <br/>
      {isPaymentLoading
        ? <Loader />
        : (
          <button
            type="button"
            onClick={(e) => handleSubscribe(e, planId)}
            className="text-white w-2/3 mt-2 border-[1px] p-2 bg-[#495c8d] border-[#495c8d] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
          >
            Subscribe
          </button>
        )}
    </div>
  </div>
);

export default function Services() {
  const { connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext);
  const { ownerAccount, plan, createPlan, subscribeNow, isLoading: isPaymentLoading, subscription, getSubscriptionDetail} = useContext(PaymentContext);
  const handleSubscribe = (e,planId,) => {
    e.preventDefault();
    console.log(planId)
    subscribeNow(planId, currentAccount);
  };

  return (
    <div className="flex w-full justify-center items-center gradient-bg-services px-5 lg:px-40 md:px-20">
      <div className="flex mf:flex-col flex-col items-center justify-between md:py-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
            Subscribe for amazing stuff
          </h1>
          <p className="text-left my-2 text-white font-light text-base">
            Connect using Rinkeby Test Network and subscribe to one of our plans
          </p>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row justify-start items-center">
          <ServiceCard
            color="bg-[#6d6767]"
            title="Silver Plan"
            icon={<ImSpades fontSize={21} className="text-white" />}
            amount = "0.01 ETH"
            duration = "30 days"
            subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
            handleSubscribe = {handleSubscribe}
            planId = "2"
            isPaymentLoading = {isPaymentLoading}
          />
          <ServiceCard
            color="bg-[#918812]"
            title="Gold Plan"
            icon={<ImHeart fontSize={21} className="text-white" />}
            amount = "0.05 ETH"
            duration = "180 days"
            subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
            handleSubscribe = {handleSubscribe}
            planId = "3"
            isPaymentLoading = {isPaymentLoading}
          />
          <ServiceCard
            color="bg-[#178088]"
            title="Diamond Plan"
            icon={<ImDiamonds fontSize={21} className="text-white" />}
            amount = "0.09 ETH"
            duration = "365 days"
            subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
            handleSubscribe = {handleSubscribe}
            planId = "4"
            isPaymentLoading = {isPaymentLoading}
          />
        </div>
      </div>
    </div>
  )
}
