import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

    let date = new Date();
    let month = [
        'January',
        'Febuary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    let today = date.getDate() + ', ' + month[date.getMonth()] + date.getFullYear()
    
    return (
        <div className="header_section">
            <div className="logo_section">
                <div className="container">
                    <div className="logo_section">
                        <div className="header_logo">
                        <div>
                            <img src="/images/logo.png" alt="logo" />
                        </div>
                    </div>
                        <div className="header_menu">
                        <ul>
                            <li>
                                <NavLink to="/payroll" exact activeClassName="my-active">Home</NavLink>
                            </li>
                            <li>
                            <NavLink to="/setting" activeClassName="my-active">Setting</NavLink>
                            </li>
                        </ul>
                    </div>
                        <div className="header_client">
                        <div>
                            <img src="/images/client.png" alt="" />
                        </div>
                    </div>
                    </div>               
                </div>
            </div>
            <div className="text_section">
                <div className="container">
                    <div className="text_section">
                        <span> {today}</span>
                        <div>Payroll</div>
                        <p>Payments are due in 2 days</p>
                    </div>               
                </div>
            </div>
        </div>
    )  
}

export default Header;
