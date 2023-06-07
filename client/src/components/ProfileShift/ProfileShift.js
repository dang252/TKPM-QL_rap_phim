import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import "./ProfileShift.css";

import { Context } from "../../context/UserContext";

const ProfileShift = () => {
  const {
    getCinemaShift,
    shiftList,
    translateDate,
    handleRegisterShift,
    registerShiftList,
    checkInitRegisterShift,
    handleSubmitRegisterShift,
    cinemaIdTitle,
    setCinemaIdTitle,
    getCinemaProvinces,
    cinemaProvincesList,
    handleChooseCinemaProvinces,
    cinemaProvincesShiftList,
    showRegisterResult,
    handleCloseRegisterResult,
    registerResultMessage,
    checkIsRegisterShift,
  } = useContext(Context);

  const [shiftByDayList, setShiftByDayList] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const options = [
    { value: "default", label: "Tất cả" },
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

  useEffect(() => {
    getCinemaProvinces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetListShift = (cinemaId, cinemaName) => {
    // e.preventDefault();
    if (cinemaId !== "") {
      localStorage.setItem("register_cinema_id", JSON.stringify(cinemaId));
      localStorage.setItem("register_cinema_name", JSON.stringify(cinemaName));

      const proviceName = JSON.parse(localStorage.getItem("province"));
      const title = `${cinemaName}, thành phố ${proviceName}`;

      getCinemaShift(cinemaId);
      setCinemaIdTitle(title);
    }
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc muốn đăng ký lịch làm việc ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleSubmitRegisterShift(cinemaIdTitle);
                handleClose();
              }}
            >
              Đồng ý
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showRegisterResult} onHide={handleCloseRegisterResult}>
          <Modal.Header closeButton>
            <Modal.Title>Kết quả đăng ký</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <p>Danh sách đăng ký thành công:</p>
                {registerResultMessage?.success_shifts.map((shift, index) => {
                  return (
                    <p key={index + 12345}>
                      {translateDate(shift.day)}, giờ bắt đầu:{" "}
                      {shift.time_start}, giờ kết thúc: {shift.time_end}
                    </p>
                  );
                })}
              </div>
              <div>
                <p>Danh sách đăng ký thất bại:</p>
                {registerResultMessage?.fail_shifts.map((shift, index) => {
                  return (
                    <p key={index + 12345}>
                      {translateDate(shift.day)}, giờ bắt đầu:{" "}
                      {shift.time_start}, giờ kết thúc: {shift.time_end}
                    </p>
                  );
                })}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                handleCloseRegisterResult();
              }}
            >
              Đồng ý
            </Button>
          </Modal.Footer>
        </Modal>
        <Tabs defaultActiveKey="cinema" className="mb-5">
          <Tab eventKey="cinema" title="Đăng ký lịch làm việc">
            <div className="profile-shift-provinces">
              <div style={{ width: "200px" }}>
                {cinemaProvincesList.length !== 0 && (
                  <>
                    <p>Chọn thành phố:</p>
                    <Select
                      onChange={(e) => {
                        handleChooseCinemaProvinces(e);
                      }}
                      options={cinemaProvincesList}
                    />
                  </>
                )}
              </div>
              <div className="profile-shift-provinces-right">
                {cinemaProvincesShiftList.length !== 0 && (
                  <>
                    <p>Chọn ca làm việc:</p>
                    <Select
                      onChange={(e) => {
                        handleGetListShift(e.value, e.label);
                      }}
                      options={cinemaProvincesShiftList}
                    />
                  </>
                )}
              </div>
            </div>
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
                    {cinemaIdTitle}
                  </p>
                  <div style={{ width: "200px" }}>
                    <Select
                      onChange={(e) => {
                        handleSortShiftDay(e);
                      }}
                      options={options}
                    />
                  </div>
                </div>
              )}
              {shiftByDayList.length !== 0 &&
                shiftByDayList.map((shift) => {
                  return (
                    <div key={shift.id} className="shift-card-content">
                      <div className="sub-shift-card-content-left">
                        <p style={{ textAlign: "center" }}>
                          Ngày làm việc: {translateDate(shift.day)}
                        </p>
                        <p style={{ textAlign: "center" }}>
                          Giờ bắt đầu: {shift.time_start}
                        </p>
                        <p style={{ textAlign: "center" }}>
                          Giờ kết thúc: {shift.time_end}
                        </p>
                      </div>
                      <div className="sub-shift-card-content-mid">
                        <p style={{ textAlign: "center" }}>
                          Số lượng nhân viên: {getShiftAmount(shift.id_staffs)}
                          /5
                        </p>
                      </div>
                      <div className="sub-shift-card-content-right">
                        <p style={{ textAlign: "center" }}>Đăng ký làm việc</p>
                        {!checkIsRegisterShift(shift.id_staffs) ? (
                          <div
                            style={{
                              width: "25px",
                              height: "25px",
                              border: "1px solid gray",
                              margin: "5px auto",
                            }}
                            className={`${
                              checkInitRegisterShift(shift.id)
                                ? "choose"
                                : "null"
                            }`}
                            onClick={(e) => {
                              handleRegisterShift(shift.id);
                            }}
                          ></div>
                        ) : (
                          <p style={{ textAlign: "center", color: "red" }}>
                            Đã đăng ký
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              {shiftByDayList.length !== 0 && (
                <div className="text-end">
                  <Button
                    className="justify-content-end"
                    variant="danger"
                    type="button"
                    onClick={() => {
                      registerShiftList.length !== 0
                        ? handleShow()
                        : toast.error("Chọn ca làm việc trước khi đăng ký!");
                    }}
                  >
                    Đăng ký
                  </Button>
                </div>
              )}
            </div>
          </Tab>
          <Tab eventKey="staff" title="Tra cứu lịch làm việc">
            Tab content for Profile
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileShift;
