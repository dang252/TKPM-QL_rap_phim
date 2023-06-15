import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Context } from "../../context/UserContext";

import SeatsContent from "../../components/SeatsContent/SeatsContent";

const SeatsPage = () => {
  const {
    closeModal,
    getSeats,
    setSeatsPickList,
    seatsList,
    detailMovie,
    getDetailMovie,
  } = useContext(Context);

  const [searchParams] = useSearchParams();
  const paramsIdSchedule = searchParams.get("id_schedule");
  const paramsIdMovie = searchParams.get("id_movie");
  const paramsIdRoom = searchParams.get("id_room");
  const paramsCinemaName = searchParams.get("name");
  const paramsTime = searchParams.get("time");

  useEffect(() => {
    document.title = "CGV Cinemas Fake | Đặt vé";
    closeModal();
  }, [closeModal]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSeatsPickList([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSeats(paramsIdSchedule, paramsTime);
    getDetailMovie(paramsIdMovie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.onload = () => {
    let reloadingBlockSeats = sessionStorage.getItem(
      "register_seats_block_result"
    );

    if (reloadingBlockSeats) {
      window.scrollTo(0, 0);

      const result = JSON.parse(
        localStorage.getItem("register_seats_block_result")
      );

      if (result === "OK") {
        toast.success("Khóa ghế thành công!");
      } else {
        toast.error("Khóa ghế thất bại");
      }

      sessionStorage.removeItem("reloading_register_shift");
    }
  };

  return (
    <div>
      <SeatsContent
        seatsList={seatsList}
        paramsIdSchedule={paramsIdSchedule}
        paramsIdRoom={paramsIdRoom}
        paramsCinemaName={paramsCinemaName}
        detailMovie={detailMovie}
        paramsTime={paramsTime}
      />
    </div>
  );
};

export default SeatsPage;
