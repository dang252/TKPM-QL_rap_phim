import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Context } from "../../context/UserContext";

import "./MobileNavbar.css";

const MobileNavbar = () => {
  const { username, logout } = useContext(Context);

  // if (username) {
  //   console.log("Mobile:", username);
  // }

  return (
    <div className="mobile-navbar-container">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <div className="mobile-navbar-logo">
              <img alt="cgv-logo" src="../../assets/img/cgvlogo.png" />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link> */}
              <NavDropdown title="PHIM">
                <NavDropdown.Item href="/movie/showing">
                  Phim đang chiếu
                </NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item href="/movie/comming">
                  Phim sắp chiếu
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="me-auto">
              <NavDropdown title="RAP CGV">
                <NavDropdown.Item href="/cinema/all">
                  Tất cả các rạp
                </NavDropdown.Item>
                <NavDropdown.Item href="/cinema/special">
                  Rạp đặc biệt
                </NavDropdown.Item>
                <NavDropdown.Item href="/cinema/3d">Rạp 3D</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="me-auto">
              <NavDropdown title="TÀI KHOẢN">
                {!username ? (
                  <>
                    <NavDropdown.Item href="/login">Đăng nhập</NavDropdown.Item>
                    <NavDropdown.Item href="/register">
                      Đăng ký
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item href="#">
                      Hello: {username}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={(e) => {
                        logout();
                      }}
                    >
                      Đăng xuất
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MobileNavbar;
