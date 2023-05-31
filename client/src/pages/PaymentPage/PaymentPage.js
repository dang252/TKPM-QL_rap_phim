import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import PaymentContent from "../../components/PaymentContent/PaymentContent";

import { Context } from "../../context/UserContext";

const PaymentPage = () => {
  const { seatsPickList, getTicketPrice, ticketPrice } = useContext(Context);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const paramsIdSchedule = searchParams.get("id_schedule");
  const paramsIdMovie = searchParams.get("id_movie");
  const paramsIdRoom = searchParams.get("id_room");
  const paramsCinemaName = searchParams.get("name");
  const paramsTime = searchParams.get("time");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (seatsPickList.length === 0) {
      navigate(
        `/book/seats?id_movie=${paramsIdMovie}&id_room=${paramsIdRoom}&id_schedule=${paramsIdSchedule}&name=${paramsCinemaName}&time=${paramsTime}`
      );
    }
  }, [
    navigate,
    seatsPickList,
    paramsIdMovie,
    paramsIdRoom,
    paramsIdSchedule,
    paramsCinemaName,
    paramsTime,
  ]);

  useEffect(() => {
    getTicketPrice("2023-05-24", paramsTime, paramsIdMovie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsTime, paramsIdMovie]);

  return (
    <div>
      <PaymentContent
        ticketPrice={ticketPrice}
        paramsTime={paramsTime}
        paramsCinemaName={paramsCinemaName}
        paramsIdSchedule={paramsIdSchedule}
        paramsIdRoom={paramsIdRoom}
      />
    </div>
  );
};

export default PaymentPage;
