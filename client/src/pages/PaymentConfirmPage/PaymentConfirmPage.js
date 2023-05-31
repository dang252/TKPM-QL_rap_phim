import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import PaymentConfirm from "../../components/PaymentConfirm/PaymentConfirm";

import { Context } from "../../context/UserContext";

const PaymentConfirmPage = () => {
  const { seatsPickList, ticketInfoResult, getDate } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (seatsPickList.length === 0) {
      navigate("/");
    }
  }, [navigate, seatsPickList]);

  return (
    <div>
      <PaymentConfirm ticketInfoResult={ticketInfoResult} getDate={getDate} />
    </div>
  );
};

export default PaymentConfirmPage;
