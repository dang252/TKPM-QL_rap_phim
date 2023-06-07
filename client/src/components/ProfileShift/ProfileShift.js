import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs, Form, Button } from "react-bootstrap";
import Select from "react-select";
import "./ProfileShift.css";

import { Context } from "../../context/UserContext";

const ProfileShift = () => {
  const { getCinemaShift, shiftList, translateDate } = useContext(Context);

  const [cinemaId, setCinemaId] = useState("");
  const [cinemaIdTitle, setCinemaIdTitle] = useState("");
  const [shiftByDayList, setShiftByDayList] = useState([]);

  const options = [
    { value: "default", label: "Xem lịch làm việc theo ngày" },
    { value: "1", label: "Thứ 2" },
    { value: "2", label: "Thứ 3" },
    { value: "3", label: "Thứ 4" },
    { value: "4", label: "Thứ 5" },
    { value: "5", label: "Thứ 6" },
    { value: "6", label: "Thứ 7" },
    { value: "7", label: "Chủ nhật" },
  ];

  useEffect(() => {
    if (shiftList.length !== 0) {
      setShiftByDayList(shiftList);
    }
  }, [shiftList]);

  const handleGetListShift = (e, cinemaId) => {
    e.preventDefault();

    if (cinemaId !== "") {
      getCinemaShift(cinemaId);
      setCinemaIdTitle(cinemaId);
    }
    setCinemaId("");
  };

  const getShiftAmount = (list) => {
    let count = 0;
    list.forEach((element) => {
      return ++count;
    });
    return count;
  };

  const handleSortShiftDay = (value) => {
    const sortShiftList = shiftList.filter((shift) => {
      return translateDate(shift.day) === value.label;
    });

    if (value.value !== "default") setShiftByDayList(sortShiftList);
    else setShiftByDayList(shiftList);
  };

  return (
    <div className="profile-shift-container">
      <h4 className="profile-shift-title">QUẢN LÝ LỊCH LÀM VIỆC</h4>
      <p className="profile-shift-subtitle">Quản lý & đăng ký lịch làm việc</p>
      <div className="profile-shift-content">
        <Tabs defaultActiveKey="cinema" className="mb-5">
          <Tab eventKey="cinema" title="Lịch làm việc theo rạp">
            <Form
              onSubmit={(e) => {
                handleGetListShift(e, cinemaId);
              }}
              className="mb-5"
            >
              <Form.Group className="mb-3">
                <Form.Label>Nhập mã rạp phim để tra cứu:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mã rạp phim"
                  value={cinemaId}
                  onChange={(e) => {
                    setCinemaId(e.target.value);
                  }}
                />
              </Form.Group>
              <Button variant="danger" type="submit">
                Tra cứu
              </Button>
            </Form>
            <div>
              {shiftByDayList.length !== 0 && (
                <div>
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Danh sách ca làm việc cho mã rạp phim: {cinemaIdTitle}
                  </p>
                  <Select
                    onChange={(e) => {
                      handleSortShiftDay(e);
                    }}
                    options={options}
                  />
                </div>
              )}
              {shiftByDayList.length !== 0 &&
                shiftByDayList.map((shift) => {
                  return (
                    <div
                      key={shift.id}
                      style={{
                        border: "1px solid gray",
                        margin: "20px 0",
                        padding: "20px 20px",
                      }}
                    >
                      <div>
                        <p>Ngày làm việc: {translateDate(shift.day)}</p>
                        <p>Giờ bắt đầu: {shift.time_start}</p>
                        <p>Giờ kết thúc: {shift.time_end}</p>
                        <p>
                          Số lượng nhân viên: {getShiftAmount(shift.id_staffs)}
                          /5
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Tab>
          <Tab eventKey="staff" title="Lịch làm việc cá nhân">
            Tab content for Profile
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileShift;
