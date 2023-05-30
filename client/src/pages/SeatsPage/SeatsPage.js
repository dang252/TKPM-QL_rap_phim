import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Context } from "../../context/UserContext";

import SeatsContent from "../../components/SeatsContent/SeatsContent";

const SeatsPage = () => {
  const { closeModal, getSeats, seatsList, detailMovie, getDetailMovie } =
    useContext(Context);

  const [searchParams] = useSearchParams();
  const paramsIdSchedule = searchParams.get("id_schedule");
  const paramsIdMovie = searchParams.get("id_movie");
  const paramsCinemaName = searchParams.get("name");
  const paramsTime = searchParams.get("time");

  // console.log(detailMovie);

  useEffect(() => {
    document.title = "CGV Cinemas Fake | Đặt vé";
    window.scrollTo(0, 0);
    closeModal();
  }, [closeModal]);

  useEffect(() => {
    getSeats(paramsIdSchedule);
    getDetailMovie(paramsIdMovie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SeatsContent
        seatsList={seatsList}
        paramsIdSchedule={paramsIdSchedule}
        paramsCinemaName={paramsCinemaName}
        detailMovie={detailMovie}
        paramsTime={paramsTime}
      />
    </div>
  );
};

export default SeatsPage;
