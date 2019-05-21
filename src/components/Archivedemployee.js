import React, { Component } from 'react';
import axios from 'axios';
// import { myJson } from './test';
import * as constant from './constant';

class ArcivedEmployee extends Component {

    state = {
        data: null,
        loader: true,
        pageLoader: false, 
    }

    restoreEmployee = (data) => {
        axios.post(constant.BACKEND_URL + "del.php", data)
            .then(res => {
                if (res.data.status === true) {
                    alert("Employee moved to active payroll.");
                } else {
                    alert("Can't move Employee, please try again.")
                }            
               
                this.componentDidMount();
            })
            .catch(e => {
                console.log(e);
            })
    }

    formatAmount = (money) => {
        if (money.length < 4) {
            return money;
        } else if (money.length === 4) {
            let firstMoney = money.slice(0, 1);
            let secondMoney = firstMoney + "," + money.slice(1);
            return secondMoney;
        } else if (money.length === 5) {
            let firstMoney = money.slice(0, 2);
            let secondMoney = firstMoney + "," + money.slice(2);
            return secondMoney;
        } else if (money.length === 6) {
            let firstMoney = money.slice(0, 3);
            let secondMoney = firstMoney + "," + money.slice(3);
            return secondMoney;
        } else if (money.length === 7) {
            let firstMoney = money.slice(0, 1);
            let secondMoney = money.slice(1, 4);
            let thirdMoney = firstMoney + "," + secondMoney + "," + money.slice(4);
            return thirdMoney;
        } else if (money.length === 8) {
            let firstMoney = money.slice(0, 2);
            let secondMoney = money.slice(2, 5);
            let thirdMoney = firstMoney + "," + secondMoney + "," + money.slice(5);
            return thirdMoney;
        } else if (money.length === 9) {
            let firstMoney = money.slice(0, 3);
            let secondMoney = money.slice(3, 6);
            let thirdMoney = firstMoney + "," + secondMoney + "," + money.slice(6);
            return thirdMoney;
        } else {
            return money;
        }
    }

    componentDidMount() {
        let db = 'archived';
        axios.get(constant.BACKEND_URL + "select.php?db=" + db)
        .then(res => {
            this.setState({
                pageLoader: true,
            })

            let data = res.data.data;

            this.setState({
                data: data,
            })            
        });
    }


    render() {

        let archivedList = null;

        if (this.state.data) {

            archivedList = (
                <div className="payroll_table_body">
                    {
                        this.state.data.map((myData, index) => {
                            return <div key={index}>
                                <div className="payroll_client_acc">
                                {myData.account}
                                </div>
                                <div className="payroll_client_name">
                                {
                                    myData.status === "true" ? 
                                    <span className="name_green">&#9679;</span>:
                                    <span className="name_red">&#9679;</span> 
                                }
                                {myData.fullname}
                                </div>
                                {/* <div className="payroll_client_hour">
                                    400
                                </div>
                                <div className="payroll_client_salary">
                                {myData.salary}
                                </div> */}
                                <div className="payroll_client_amount">
                                    &#8358;{this.formatAmount(myData.basic)}
                                </div>
                                <div className="payroll_client_status">
                                    <span className="restore" onClick={() => this.restoreEmployee(myData)}>
                                            Restore
                                    </span>
                                </div>
                            </div>
                        })
                    }
                </div>
            )            
        }


        return(

            <div className="detail_section">
                    <div className="container">
                    {
                        this.state.pageLoader ? 
                        <div className="payroll_table">
                            <div className="payroll_table_header">
                                <div className="payroll_table_account">
                                    Account No.
                                </div>
                                <div className="payroll_table_name">
                                    Full Name
                                </div>
                                {/* <div className="payroll_table_hour">
                                    Hours
                                </div>
                                <div className="payroll_table_salary">
                                    Salary/hr
                                </div> */}
                                <div className="payroll_table_amount">
                                    Amount (&#8358;)
                                </div>
                                <div className="payroll_table_status">
                                    Action
                                </div>                        
                            </div>                            
                            {archivedList}
                        </div> : 
                            <div>
                                <div className="loader">
                                <img src="/images/loader.png" alt=""  className="spinning "/>
                            </div>
                            <p>
                                Hold on... fetching payroll list
                            </p>
                        </div>
                    }
                        
                    </div>
            </div>
        )
    }
}

export default ArcivedEmployee;