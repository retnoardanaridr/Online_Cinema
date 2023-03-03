import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Container, Offcanvas, Nav, Button, Dropdown, Image, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FormLogin from '../auth/login';
import FormRegister from '../auth/register';
import logo from '../../assets/Icon.png'
import basket from '../../assets/cartIcon.png';
import user from '../../assets/profile.png';
import logout from '../../assets/logout.png'
import { UserContext } from '../../contexts/userContext';
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import MyProfile from './myProfile';
import NavAdmin from './navLogin';
import NavLogin from './navLogin';



const style = {
    button: {
        width: "120px",
    },
    buttonReg: {
        width: "150px",
        backgroundColor: "#cd2e71",
    }
}


function Navibar() {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext);
    const [showLogin, setShowLogin] = useState();
    const [showRegister, setShowRegister] = useState();

    function Logout() {
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        // value state from usercontext
        if (state.isLogin === true) {
            setShowLogin(false)
            setShowRegister(false)
        }
    }, [state.isLogin])

    return (
        <div bg="black">
            {['md'].map((expand) => (
                <Navbar key={expand} bg="black" expand={expand}>
                    <Container bg="black">
                        <Navbar.Brand>
                            <Link to="/"><img
                                alt=""
                                src={logo}
                                width="200"
                                height="80"
                                className="d-inline-block align-top"
                            /></Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Side Bar
                                    <hr />
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {state.isLogin ? (
                                    
                                    <NavLogin />

                                     ) : (
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Button onClick={() => setShowLogin(true)} variant='bg' className='me-3 py-1 text-light fw-bold' style={style.button}>Login</Button>
                                        <Button onClick={() => setShowRegister(true)} variant='bg' className='py-1 text-light fw-bold' style={style.buttonReg}>Register</Button>
                                    </Nav>
                                )}

                                <FormLogin
                                    show={showLogin}
                                    setShow={setShowLogin}
                                    setShowRegister={setShowRegister}
                                />
                                <FormRegister
                                    show={showRegister}
                                    setShow={setShowRegister}
                                    setShowLogin={setShowLogin}
                                />

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    )
}

export default Navibar;
