import React, { useContext, useEffect } from "react";
import { Nav, Dropdown, Image, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import product from '../../assets/drink.png';
import topping from '../../assets/toping.png';
import logout from '../../assets/logout.png'
import user from '../../assets/profile.png';
// import basket from '../../assets/cartIcon.png';
import { UserContext } from '../../contexts/userContext';
// import Navibar from "./navbar";



function NavLogin() {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext);

    function Logout() {
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(()=>{
    },[state])
    return (

        <>
        { state.user.role === "admin" ? (
            
                    <Nav className='ms-auto'>
                        <Dropdown>
                            <Dropdown.Toggle variant='' id='dropdown-basic'>
                                <Image src={user} width='45px' height='45px' className='rounded-pill' />
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ backgroundColor: 'black' }}>
                                <Dropdown.Item className=' align-items-center border-bottom' style={{ height: '50px' }}>
                                    <Link to={'/add-film'}
                                        className='text-light text-decoration-none d-flex gap-2'
                                    > <Image src={product} width='25px' /> Add Film
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item className=' align-items-center border-bottom' style={{ height: '50px' }}>
                                    <Link to={'/category'}
                                        className='text-light text-decoration-none d-flex gap-2'
                                    > <Image src={topping} width='25px' /> Category
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item className=' align-items-center border-bottom' style={{ height: '50px' }}>
                                    <Link to={'/transaction'}
                                        className='text-light text-decoration-none d-flex gap-2'
                                    > <Image src={user} width='25px' /> Transaction
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    className='text-light d-flex gap-2 align-items-center'
                                    style={{ height: '50px' }}
                                    onClick={() => {
                                        Logout();

                                    }}
                                ><Image src={logout} width='25px' />
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
            ) : (               
                    <Nav className='ms-auto'>
                        <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }}>
                            <>
                        {/* <Image src={basket} width='40px' height='40px' onClick={() => navigate("/cart")} />
                        <Badge bg='danger' pill style={{ height: '25px', width: '25px' }} className='d-flex align-items-center justify-content-center fs-6 position-absolute ms-4'>

                        </Badge> */}
                    </>
                            <Dropdown>

                                <Dropdown.Toggle variant='' id='dropdown-basic'>
                                    <Image src={user} width='45px' height='45px' className='rounded-pill' />
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ backgroundColor: 'black' }}>
                                    <Dropdown.Item className=' align-items-center border-bottom' style={{ height: '50px' }}>
                                        <Link to={'/profile'}
                                            className='text-light text-decoration-none d-flex gap-2'
                                        > <Image src={user} width='25px' /> Profile
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item className=' align-items-center border-bottom' style={{ height: '50px' }}>
                                        <Link to={'/my-film'}
                                            className='text-light text-decoration-none d-flex gap-2'
                                        > <Image src={user} width='25px' /> My Film
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        className='d-flex gap-2 text-light align-items-center'
                                        style={{ height: '50px' }}
                                        onClick={() => {
                                            Logout();

                                        }}
                                    ><Image src={logout} width='25px' />
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Nav>
          )}
        </>
    )
}

export default NavLogin;