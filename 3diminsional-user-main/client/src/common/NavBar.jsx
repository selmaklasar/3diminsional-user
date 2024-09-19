import React, { useState } from 'react';
import { Col, Container,Form, InputGroup,Nav, Navbar, Row } from 'react-bootstrap';
import style from './NavBar.module.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios-instances';

const NavBar = () => {

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (searchTerm) => {
        if (!searchTerm) {
          setSuggestions([]);
          return;
        }
    
        const response = await axiosInstance.get(`/search/searchmodel?name=${searchTerm}`)
        console.log("resposne",response.data.data)
        setSuggestions(response.data.data);
      };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        fetchSuggestions(value);
      };
    

    return (
        <><div
        style={{
            position: "fixed",   // Fixes the navbar at the top
            top: 0,              // Aligns the navbar to the top of the viewport
            left: 0,             // Aligns the navbar to the left edge of the viewport
            width: "100%",       // Ensures the navbar spans the full width of the viewport
            zIndex: 1000,        // Ensures the navbar appears on top of other elements
          }}
        
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
                                onChange={handleChange}
                            />
                        </InputGroup>
                        <ul style={{ position: 'absolute', zIndex: 1000, backgroundColor: 'white', margin: 0, padding: 0,width:'240px' }}>
                            {suggestions.length > 0 && (
                                suggestions.map((suggestion, index) => (
                                    <li key={index} style={{ listStyleType: 'none', padding: '8px', cursor: 'pointer' }}>
                                        {suggestion}
                                    </li>
                                ))
                            ) }
                        </ul>  </Form>
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

export default NavBar;
