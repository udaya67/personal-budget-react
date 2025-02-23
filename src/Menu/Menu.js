import React from 'react';
import { Link } from 'react-router-dom';


function Menu() {
    return (
        <div class="menu">
            <ul>
                
                <li><Link to="/" aria-label="Homepage">Homepage</Link></li>
                <li><Link to="/about" aria-label="About Us">About</Link></li>
                <li><Link to="/login" aria-label="Login Page">Login</Link></li>
                <li><Link to="https://google.com" aria-label="Google Website">Google</Link></li>    
            </ul>
        </div>
    );
}

export default Menu;
