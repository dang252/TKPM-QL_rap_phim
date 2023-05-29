import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Context } from "../../context/UserContext";

import SeatsContent from "../../components/SeatsContent/SeatsContent";

const SeatsPage = () => {
  const { closeModal, getSeats, seatsList } = useContext(Context);

  const [searchParams] = useSearchParams();
  const paramsIdSchedule = searchParams.get("id_schedule");
  const paramsCinemaName = searchParams.get("name");

  // console.log(paramsCinemaName, paramsIdSchedule);

  useEffect(() => {
    window.scrollTo(0, 0);
    closeModal();
  }, [closeModal]);

  useEffect(() => {
    getSeats(paramsIdSchedule);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SeatsContent
        seatsList={seatsList}
        paramsIdSchedule={paramsIdSchedule}
        paramsCinemaName={paramsCinemaName}
      />
    </div>
  );
};

export default SeatsPage;
