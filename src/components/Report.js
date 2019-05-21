import React, { Component } from 'react';
import Home from './Home';

class Report extends Component {
    state = {
        firstCSV: true,
        secondCSV: true,
    };

    openFirstCSV = () => {
        this.setState({
            firstCSV: false,
        })
    }

    openSecondCSV = () => {
        this.setState({
            secondCSV: false,
        })        
    }


    render() {
        return (
            <div>
                <Home />
                <div className="detail_section">
                    <div className="container">
                    <div className="payroll_table">
                            <div className="payroll_table_header">
                                <div className="payroll_report_date">
                                    Date
                                </div>
                                <div className="payroll_report_report">
                                    Report ID
                                </div>
                                <div className="payroll_report_transact">
                                    # of Transaction
                                </div>
                                <div className="payroll_report_total">
                                    Total
                                </div>
                                <div className="payroll_report_action">
                                </div>                    
                            </div>
                            <div className="payroll_table_body">
                                <div>
                                    <div className="pay_report_date">
                                        26/11/2018
                                    </div>
                                    <div className="pay_report_report">
                                        PR235678365
                                    </div>
                                    <div className="pay_report_transact">
                                        87
                                    </div>
                                    <div className="pay_report_total">
                                        ₦369,000
                                    </div>
                                    <div className="pay_report_action">
                                    {
                                        this.state.firstCSV ? 
                                            <span className="restore" onClick={this.openFirstCSV}>
                                                Download Report in CSV
                                            </span>:
                                            <span className="restore">
                                                Downloading...
                                            </span>
                                    }                                            
                                    </div>
                                </div>

                                <div>
                                    <div className="pay_report_date">
                                        26/11/2018
                                    </div>
                                    <div className="pay_report_report">
                                        PR235678365
                                    </div>
                                    <div className="pay_report_transact">
                                        87
                                    </div>
                                    <div className="pay_report_total">
                                        ₦369,000
                                    </div>
                                    <div className="pay_report_action">
                                    {
                                        this.state.secondCSV ? 
                                            <span className="restore" onClick={this.openSecondCSV}>
                                                Download Report in CSV
                                            </span>:
                                            <span className="restore">
                                                Downloading...
                                            </span>
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Report;