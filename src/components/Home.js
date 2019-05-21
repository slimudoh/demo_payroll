
import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';


const Home = () => {
        return (
            <div>
                <Header />
                <div className="detail_section_head">
                    <div className="container">
                        <div className="home_header">
                            <div className="home_header_left">
                                <div>
                                    <NavLink to="/payroll" activeStyle={{borderBottom: '5px solid #0b2591'}}>
                                            Run Payroll
                                    </NavLink>                            
                                </div>
                                <div>
                                    <NavLink to="/employees" activeStyle={{borderBottom: '5px solid #0b2591'}}>
                                            Employees
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink to="/reports" activeStyle={{borderBottom: '5px solid #0b2591'}}>
                                            Reports
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink to="/personal-settings" activeStyle={{borderBottom: '5px solid #0b2591'}}>
                                            Settings
                                    </NavLink>
                                </div>
                            </div>
                            <div  className="home_header_right">
                                <div>
                                    Filter by date
                                </div>
                            </div>
                        </div>                   
                    </div>
                </div>
            </div>
        );
}

export default Home;