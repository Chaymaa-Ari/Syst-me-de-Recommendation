import React, { useEffect } from "react";
import "./NavBar.css";

function NavBar() {

    useEffect(() => {
        const handleClick = (event) => {
            if (!event.target.matches('.get-started-btn')) {
                const dropdowns = document.getElementsByClassName('dropdown-content');
                for (let i = 0; i < dropdowns.length; i++) {
                    const openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    const toggleDropdown = () => {
        document.querySelector('.dropdown-content').classList.toggle('show');
    };

    return (
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center justify-content-lg-between">

                <h1 className="logo me-auto me-lg-0">
                    <a href="/" className="NoDeco">Job<br />Match<span>+</span></a>
                </h1>

                <nav id="navbar" className="navbar order-last order-lg-0">
                    <ul>
                        <li><a className="nav-link scrollto active" href="/">Home</a></li>
                        <li><a className="nav-link scrollto" href="#about">About</a></li>
                        <li><a className="nav-link scrollto" href="#services">Services</a></li>
                        <li><a className="nav-link scrollto" href="#team">Team</a></li>
                        <li><a className="nav-link scrollto" href="#footer">Contact</a></li>
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

                <div className="dropdown">
                    <a href="/" className="get-started-btn scrollto" onClick={(e) => { e.preventDefault(); toggleDropdown(); }}>Get Started</a>
                    <div className="dropdown-content">
                        <a href="/login">For Client</a>
                        <a href="/login1">For Administrator</a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavBar;
