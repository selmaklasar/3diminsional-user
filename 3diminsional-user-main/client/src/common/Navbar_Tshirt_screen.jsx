import React from 'react';
import { Col, Container,Form, InputGroup,Nav, Navbar, Row } from 'react-bootstrap';
import style from './NavBar.module.css';
import { Link } from 'react-router-dom';
const NavBar1 = () => {
    return (
        <><div
       
        
        >
            <Navbar bg="black" data-bs-theme="black" className={`${style.navbarfirst} py-1`}>
                <Navbar.Brand href="#home" className="mx-auto text-white">LOGO</Navbar.Brand>
            </Navbar>
            <Navbar bg="black" data-bs-theme="black" className={`${style.navbar} p-3`}
            >
                <Nav className="me-auto">
                    <Nav.Link href="#home" ><i class="fa-solid fa-bars text-white mx-2 fs-4"></i></Nav.Link>
                    <Form inline className='my-auto'>
                        <InputGroup className='my-auto'>
                            <InputGroup.Text id="basic-addon1" className=' bg-white text-black border-0'><i class="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
                            <Form.Control
                                placeholder="Search.."
                                className=' bg-white border-0 text-black m-0 p-0'
                                style={{ boxShadow: 'none' }}
                            />
                        </InputGroup>
                    </Form>
                </Nav>
                <Nav className="ms-auto p-0">
                    {/* <Nav.Link href="#home"><i class="fa-solid fa-house text-white mx-2 fs-6"></i></Nav.Link> */}
                    <Nav.Link as={Link} to="/home"><i class="fa-solid fa-house text-white mx-2 fs-6"></i></Nav.Link>

                    <Nav.Link href="#features"><i class="fa-solid fa-heart text-white mx-2 fs-6"></i></Nav.Link>
                    <Nav.Link as={Link} to="/productscreen"><i class="fa-solid fa-cart-shopping text-white mx-2 fs-6"></i></Nav.Link>
                    <Nav.Link as={Link} to="/signup"><i class="fa-solid fa-user text-white mx-2 fs-6"></i></Nav.Link>
                </Nav>
            </Navbar>
            </div>
        </>
    );
};

export default NavBar1;
