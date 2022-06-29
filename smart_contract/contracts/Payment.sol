//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


contract Payment {
  uint public nextPlanId;
  address public owner;

  struct Plan {
    address merchant;
    uint amount;
    uint frequency;
  }
  struct Subscription {
    address subscriber;
    uint start;
    uint nextPayment;
  }
  mapping(uint => Plan) public plans;
  mapping(address => mapping(uint => Subscription)) public subscriptions;

  event PlanCreated(
    address merchant,
    uint planId,
    uint date
  );
  event SubscriptionCreated(
    address subscriber,
    uint planId,
    uint date
  );
  event SubscriptionCancelled(
    address subscriber,
    uint planId,
    uint date
  );
  event PaymentSent(
    address from,
    address to,
    uint amount,
    uint planId,
    uint date
  );

  event Claim(
    address owner,
    uint amount
  );

  constructor() {
      owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
  }

  function createPlan(uint amount, uint frequency) external onlyOwner returns(bool){
    require(amount > 0, 'amount needs to be > 0');
    require(frequency > 0, 'frequency needs to be > 0');
    plans[nextPlanId] = Plan(
      msg.sender, 
      amount, 
      frequency
    );
    nextPlanId++;
    return true;
  }

  function claim() external onlyOwner{
      require(address(this).balance > 0, "No balance available");
      uint256 amount = address(this).balance-1000;
      payable(owner).transfer(amount);
      emit Claim(owner, amount);
  }
  
  function subscribe(uint planId) payable external {
    Plan storage plan = plans[planId];
    require(plan.merchant != address(0), "this plan does not exist");
    require(plan.amount == msg.value, "Amount is not correct");

    emit PaymentSent(
      msg.sender, 
      plan.merchant, 
      plan.amount, 
      planId, 
      block.timestamp
    );

    subscriptions[msg.sender][planId] = Subscription(
      msg.sender, 
      block.timestamp, 
      block.timestamp + plan.frequency
    );
    emit SubscriptionCreated(msg.sender, planId, block.timestamp);
  }

  function getSubscriptions(address _subscriber, uint planId) external view returns(Subscription memory){
      Subscription memory sub = subscriptions[_subscriber][planId];
      return (sub);
  }

  function getContractBalance() external view returns(uint256){
      return (address(this).balance);
  }

  function cancel(uint planId) external {
    Subscription storage subscription = subscriptions[msg.sender][planId];
    require(
      subscription.subscriber != address(0), 
      'this subscription does not exist'
    );
    delete subscriptions[msg.sender][planId]; 
    emit SubscriptionCancelled(msg.sender, planId, block.timestamp);
  }

  function pay(address subscriber, uint planId) payable external {
    Subscription storage subscription = subscriptions[subscriber][planId];
    Plan storage plan = plans[planId];
    require(
      subscription.subscriber != address(0), 
      'this subscription does not exist'
    );
    require(
      block.timestamp > subscription.nextPayment,
      'not due yet'
    );

    require(plan.amount == msg.value, "Amount is not correct");

    emit PaymentSent(
      subscriber,
      plan.merchant, 
      plan.amount, 
      planId, 
      block.timestamp
    );
    subscription.nextPayment = subscription.nextPayment + plan.frequency;
  }
}