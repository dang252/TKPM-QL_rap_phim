import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import PaymentContent from "../../components/PaymentContent/PaymentContent";

import { Context } from "../../context/UserContext";

const PaymentPage = () => {
  const { seatsPickList } = useContext(Context);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const paramsIdSchedule = searchParams.get("id_schedule");
  const paramsIdMovie = searchParams.get("id_movie");
  const paramsCinemaName = searchParams.get("name");
  const paramsTime = searchParams.get("time");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (seatsPickList.length === 0) {
      navigate(
        `/book/seats?id_movie=${paramsIdMovie}&id_schedule=${paramsIdSchedule}&name=${paramsCinemaName}&time=${paramsTime}`
      );
    }
  }, [
    navigate,
    seatsPickList,
    paramsIdMovie,
    paramsIdSchedule,
    paramsCinemaName,
    paramsTime,
  ]);

  return (
    <div>
      <PaymentContent />
    </div>
  );
};

export default PaymentPage;
