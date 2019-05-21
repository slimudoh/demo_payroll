import React, { Component } from 'react';
import Home from './Home';
import ActivePayroll from './Activepayroll';
import AddEmployee from './Addemployee';
import ArcivedEmployee from './Archivedemployee';
import axios from 'axios';
// import { myJson } from './test';
import * as constant from './constant'


class Employees  extends Component {
        state = {
            activePayroll: true,
            addEmployee: false,
            archiveEmployee: false,
            getActive: 0,
            getArchived: 0,
        }

    changeToActivePayroll = () => {
            this.setState ({
                activePayroll: true,
                addEmployee: false,
                archiveEmployee: false,
            })
    }

    changeToAddEmployee = () => {
            this.setState ({
                activePayroll: false,
                addEmployee: true,
                archiveEmployee: false,
            })
    }

    changeArchiveEmployee = () => {
            this.setState ({
                activePayroll: false,
                addEmployee: false,
                archiveEmployee: true,
            })
    }

    componentDidMount() {
        let db = 'active';
        axios.get(constant.BACKEND_URL + "select.php?db=" + db)
        .then(res => {
            let data = res.data.data.length;
            this.setState({
                getActive: data,
            })            
        })

        db = 'archived';
        axios.get(constant.BACKEND_URL + "select.php?db=" + db)
        .then(res => {
            this.setState({
                pageLoader: true,
            })

            let data = res.data.data.length;
            this.setState({
                getArchived: data,
            })
        })
    }

    render() {

        const classesActive = [];
        const classesAdd = [];
        const classesArchived = [];

        if (this.state.activePayroll === true) {
            classesActive.push("employee_menu_active");
        } else {
            classesActive.pop("employee_menu_active");
        }

        if (this.state.addEmployee === true) {
            classesAdd.push("employee_menu_active");
        } else {
            classesAdd.pop("employee_menu_active");
        }

        if (this.state.archiveEmployee === true) {
            classesArchived.push("employee_menu_active");
        } else {
            classesArchived.pop("employee_menu_active");
        }

        return (
            <div>
                <Home />
                <div className="detail_section_employee">
                    <div className="container">
                        <div className="employee_menu">
                            <div onClick= {this.changeToActivePayroll} className={classesActive}>
                                + Active Payroll(<span className="bold_value">{this.state.getActive}</span>)
                            </div>
                            <div onClick= {this.changeToAddEmployee} className={classesAdd}>
                                + Add Employee
                            </div>
                            <div onClick= {this.changeArchiveEmployee} className={classesArchived}>
                                + Archived Employee(<span className="bold_value">{this.state.getArchived}</span>)
                            </div>
                        </div>
                        <div className="employee_body">
                            {
                                this.state.activePayroll ? <ActivePayroll /> : null
                            }

                            {
                                this.state.addEmployee ? <AddEmployee /> : null
                            }

                            {
                                this.state.archiveEmployee ? <ArcivedEmployee /> : null
                            }                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Employees;