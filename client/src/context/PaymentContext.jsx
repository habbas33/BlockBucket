import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { paymentContractABI, paymentContractAddress } from '../utils/constants';
import { getCreate2Address } from 'ethers/lib/utils';

export const PaymentContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const paymentContract = new ethers.Contract(paymentContractAddress, paymentContractABI, signer);
    
    return paymentContract;
}

export const PaymentProvider = ({children}) => {
    const [plan, setPlan] = useState({ amount: "", duration: "" });
    // const [currentAccount, setCurrentAccount] = useState("");
    const [ownerAccount, setOwnerAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    // const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [subscription, setSubscription] = useState([]);


    const handlePlanChange = (e, name) => {
        setPlan((prevState) => ({...prevState, [name]: e.target.value}));
    }

    useEffect(() => {
        getOwnerAddress();
    }, [ownerAccount])
    
    const createPlan = async () => {
        try {
            if (!ethereum) return alert("Please install metamask")
            // const provider = new ethers.providers.Web3Provider(ethereum);
            const { amount, duration } = plan;
            const paymentContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount); //to gwei hex amount

            const subscriptionDuration = (duration*86400); 
            console.log("subscriptionDuration",subscriptionDuration);
            const transactionHash = await paymentContract.createPlan(parsedAmount, subscriptionDuration);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const plan0 = await paymentContract.plans(0);
            console.log(`plan - ${plan0}`);

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }
    }

    const subscribeNow = async (planId, subscriber) => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const paymentContract = getEthereumContract();
           
            const plan = await paymentContract.plans(planId);
            const options = {value: plan[1]}
            const transactionHash = await paymentContract.subscribe(planId, options);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            
            const subscriptionDetail = await paymentContract.getSubscriptions(subscriber,planId);
            console.log(`subscriptionDetail - ${subscriptionDetail}`);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }
    }

    const cancelSubscription = async (planId) => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const paymentContract = getEthereumContract();
            const result = await paymentContract.cancel(planId);
            setIsLoading(true);
            console.log(`Loading - ${result.hash}`);
            await result.wait();
            setIsLoading(false);
            console.log(`Success - ${result.hash}`);
            console.log(`result - ${result}`);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }
    }

    const claim = async () => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const paymentContract = getEthereumContract();
            const result = await paymentContract.claim();
            setIsLoading(true);
            console.log(`Loading - ${result.hash}`);
            await result.wait();
            setIsLoading(false);
            console.log(`Success - ${result.hash}`);
            console.log(`result - ${result}`);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }
    }

    const getSubscriptionDetail = async ( subscriber) => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const paymentContract = getEthereumContract();
            console.log("subscriber = ",subscriber)
            const _subscriber = subscriber? subscriber : "0x0000000000000000000000000000000000000000";
            console.log("_subscriber = ",_subscriber)
            let subscriptionDetail = [];    
            let planSubscribed = 0;
            for (let planId=2; planId <= 4; planId++){
                let subscriptionInfo = await paymentContract.getSubscriptions(_subscriber,planId);
                    console.log(planId);
                if((subscriptionInfo[2] )>(Math.floor(Date.now() / 1000))) {
                    subscriptionDetail=subscriptionInfo;
                    planSubscribed=planId;
                }   
            }
            const structuredSubscription = {
              subscriber: subscriptionDetail[0]?subscriptionDetail[0]:0,
              startTimestamp: subscriptionDetail[1]?subscriptionDetail[1]:0,
              endTimestamp: subscriptionDetail[2]?subscriptionDetail[2]:0,
              isSubscribed: subscriptionDetail[2]? (subscriptionDetail[2] )>(Math.floor(Date.now() / 1000)): false,
              plan: planSubscribed,
             };
            console.log(`subscriptionDetail - ${subscriptionDetail}`);
            console.log(`data Now - ${Math.floor(Date.now() / 1000)}`);
            // console.log(`data Now - ${new Date(subscriptionDetail[1] * 1000).toLocaleString()}`);
            console.log(`data delta - ${(subscriptionDetail[2])-(Math.floor(Date.now() / 1000))}`);
            console.log(`is subscribed - ${(subscriptionDetail[2] )>(Math.floor(Date.now() / 1000))}`);
            console.log("structuredSubscription ->", structuredSubscription);
            setSubscription(structuredSubscription);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }
    }

    const getOwnerAddress = async () => {
        try {
          if (ethereum) {
            const paymentContract = getEthereumContract();
    
            const ownerAddress = await paymentContract.owner();
        
            console.log("ownerAddress" ,ownerAddress);
    
            setOwnerAccount(ownerAddress);
            console.log("ownerAccount" ,ownerAccount);
          } else {
            console.log("Ethereum is not present");
          }
        } catch (error) {
          console.log(error);
        }
    };

    const getBalance = async () => {
        try {
          if (ethereum) {
            const paymentContract = getEthereumContract();
    
            const _balance = await paymentContract.getContractBalance();
        
            console.log("_balance" ,ethers.utils.formatEther(_balance));
    
            setBalance(ethers.utils.formatEther(_balance));
            console.log("contract balance" , balance);
          } else {
            console.log("Ethereum is not present");
          }
        } catch (error) {
          console.log(error);
        }
    };
    
    return (
        <PaymentContext.Provider value={{ plan, createPlan, ownerAccount, handlePlanChange, isLoading, subscribeNow, subscription, getSubscriptionDetail, cancelSubscription, claim, getBalance, balance }}>
            {children}
        </PaymentContext.Provider>
    );
};