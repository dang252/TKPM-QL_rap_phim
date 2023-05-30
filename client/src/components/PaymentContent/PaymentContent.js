import React, { useContext } from "react";
import "./PaymentContent.css";

import { Context } from "../../context/UserContext";

const PaymentContent = () => {
  const { seatsPickList, foodPickList } = useContext(Context);

  console.log("Seats:", seatsPickList);
  console.log("Foods:", foodPickList);

  return <div className="payment-content-container">PaymentContent</div>;
};

export default PaymentContent;
