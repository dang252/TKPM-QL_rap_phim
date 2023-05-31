import React, { useEffect, useContext } from "react";

import FoodContent from "../../components/FoodContent/FoodContent";

import { Context } from "../../context/UserContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const FoodPage = () => {
  const { seatsPickList, getFoods, foodList, setFoodPickList } =
    useContext(Context);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const paramsIdSchedule = searchParams.get("id_schedule");
  const paramsIdMovie = searchParams.get("id_movie");
  const paramsCinemaName = searchParams.get("name");
  const paramsTime = searchParams.get("time");

  useEffect(() => {
    window.scrollTo(0, 0);
    setFoodPickList([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (seatsPickList.length === 0) {
      navigate(
        `/book/seats?id_movie=${paramsIdMovie}&id_movie=${paramsIdMovie}&id_schedule=${paramsIdSchedule}&name=${paramsCinemaName}&time=${paramsTime}`
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

  useEffect(() => {
    getFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <FoodContent
        foodList={foodList}
        paramsIdSchedule={paramsIdSchedule}
        paramsCinemaName={paramsCinemaName}
      />
    </div>
  );
};

export default FoodPage;
