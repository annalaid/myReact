import React from 'react';

function Footer() {
    return (
        <footer className="navbar fixed-bottom">
            <a href="https://www.webucator.com" className="text-light">
                Copyright &copy; {new Date().getFullYear()} Webucator
            </a>
        </footer>
    )
}

export default Footer;