import React, { Component } from 'react';
import Home from './Home';
import axios from 'axios';
// import {myJson} from './test';
import * as constant from './constant'

class Payroll extends Component {   
    
    state = {
        data: [],
        loader: true,
        total: 0,
        pageLoader: false,
        newAmount: [],
        getNewTotal: 0,
    }

    componentDidMount() {
        let db = 'active';
        axios.get(constant.BACKEND_URL + "select.php?db=" + db)
        .then(res => {
            this.setState({
                pageLoader: true,
            })

            this.setState({
                data: res.data.data,
            }) 
        });

        db = 'archived';
        axios.get(constant.BACKEND_URL + "select.php?db=" + db)
        .then(res => {

            this.setState({
                data: this.state.data.concat(res.data.data)
            })
            
            this.setState({
                pageLoader: true,
                // data: data,
            }) 
        });       
    }

    getAmount = (event, data) => {
        let amount = 0;
        if (event.target.checked === true) {
            this.state.newAmount.push(data);
        } else if (event.target.checked === false) {
            let index = this.state.newAmount.indexOf(data);
            if (index > -1) { 
                this.state.newAmount.splice(index, 1);
            }
        }
        if (this.state.newAmount.length > 0) {
            for (let i = 0; i < this.state.newAmount.length; i++) {
                amount = amount + parseInt(this.state.newAmount);
            }
        }        

        console.log(amount);
        this.setState({
            getNewTotal: amount,
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

    doPaystack = () => {        
        this.setState({
            loader: false,
        })

        // let total = 0;
        // let average = 0;
        // let grandTotal = 0;

        if (this.state.data) {
            let average = 0;
            let grandTotal = 0;
            // this.state.data.map(totalData => {
            //     return total = this.state.getNewTotal;
            // })

            average = Math.floor(( this.state.getNewTotal * 10) / 100);
            grandTotal = Math.floor(this.state.getNewTotal + average);

            let paystackUrl = "https://api.paystack.co/transaction/initialize";
            let returnUrl = constant.PAYSTACT_URL;

            let body = {
                amount: grandTotal + "00",
                email: "softwared@rovedana.com",
                reference: '' + Math.floor((Math.random() * 1000000000) + 1),
                callback_url: returnUrl
              };

        axios.post(paystackUrl, body, {headers: {
                    'Authorization': `Bearer ${constant.SK}`,
                    'content-type': 'application/json'
                }
            })
            .then(res => {
                let data = res.data.data
                let payrollAccess_code = data.access_code;
                let payrollUrl = data.authorization_url;
                console.log(payrollAccess_code);
                
                document.location.href = payrollUrl;
            })
            .catch(e => {
                console.log(e);
            })                      
        }
    }


    render() {
        let employeeList = null;
        let total = 0;
        let average = 0;
        let grandTotal = 0;

        if (this.state.data) {
            this.state.data.map(totalData => {
                return total = this.state.getNewTotal;
            })

            average = Math.floor(( this.state.getNewTotal * 10) / 100);
            grandTotal = Math.floor(this.state.getNewTotal + average);

            employeeList = (
                <div className="payroll_table_body">
                    {
                        this.state.data.map((myData, index) => {
                            return <div key={index}>
                                <div className="payroll_client_account">
                                <div>
                                    <div className="account_left">
                                        <input type="checkbox" onClick={(event) => this.getAmount(event, myData.basic)} />                                    
                                    </div>
                                    <div className="account_right">
                                        {myData.account}
                                        <br />
                                        <span>{myData.bank}</span>
                                    </div>
                                </div>
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
                                </div> */}
                                {/* <div className="payroll_client_salary">
                                {myData.salary}
                                </div> */}
                                <div className="payroll_client_amount">
                                    &#8358;{this.formatAmount(myData.basic)}
                                </div>
                                <div className="payroll_client_status">
                                </div>
                            </div>
                        })
                    }
                </div>
            )            
        }

        return (        
            <div>
                <Home />
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
                                </div>                        
                            </div>
                                {employeeList}                                
                            <div className="payroll_table_footer">
                                <div>
                                    <div className="footer_total">
                                        <div className="footer_left">
                                            Total
                                        </div>
                                        <div className="footer_right">
                                            &#8358;{this.formatAmount(total + "")}
                                        </div>
                                    </div>
                                    <div className="footer_percent">
                                        <div className="footer_left">
                                            10%
                                        </div>
                                        <div className="footer_right">
                                            &#8358;{this.formatAmount(average + "")}
                                        </div>
                                    </div>
                                    <div className="footer_grand">
                                        <div className="footer_left">
                                            Grand<br/>Total
                                        </div>
                                        <div className="footer_right" style={{fontWeight: 'bolder'}}>
                                            &#8358;{this.formatAmount(grandTotal + "")}
                                        </div></div>
                                    <div className="footer_pay" onClick={this.doPaystack}>
                                        {
                                            this.state.loader ?
                                            <div>
                                                <div className="footer_pay_left">
                                                PAY OUT</div>
                                                <div className="footer_pay_right">
                                                    <div>
                                                        <img src="/images/lock.png" alt="" />
                                                    </div>
                                                </div>
                                            </div> :
                                            <div>
                                                <div className="btn_loader">
                                                    <div className="spinning">
                                                        <img src="/images/botton.png" alt="loading" />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <p>Secured Payment Gateway</p>
                                    </div>
                                </div>
                            </div>
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
            </div>
        )
    }
}

export default Payroll;