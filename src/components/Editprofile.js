import React, { Component} from 'react';
import axios from 'axios';
// import { myJson } from './test';
import * as constant from './constant';
import { Redirect } from 'react-router-dom';

class EditProfile extends Component {
    state = {
        loader: true,
        submitLoader: true,
        closeModal: false,
        wrongAccount: false,
        wrongSalary: false,
        payroll: false,
        editProfileValue: {
            fname: "",
            designation: "",
            bank: "",
            account: "",
            salary: "",
            basic: "",
        },
    }

    componentDidMount() {        
        if (this.props.id) {
            let profileValues = this.props.id;
            this.setState({
                editProfileValue: {
                    id: profileValues.id,
                    fname: profileValues.fullname,
                    designation: profileValues.designation,
                    bank: profileValues.bank,
                    account: profileValues.account,
                    salary: profileValues.salary,
                    basic: profileValues.basic,
                }
            })
        }
    }    
    
    showLoader = () => {
        this.setState({
            loader: false,
            submitLoader: true,
        })
    }

    closeEditProfile = () => {
        console.log("hello");
        this.setState({
            closeModal: true,
        })
    }

    submitProfile = (event) => {
        event.preventDefault();
        this.setState({
            submitLoader: false,
            loader: true,
            wrongAccount: false,
            wrongSalary: false,
        })

        const editData = {
            id: this.state.editProfileValue.id,
            fname: this.fname.value,
            designation: this.designation.value,
            bank: this.bank.value,
            account:this.account.value,
            salary: this.salary.value,
            basic: this.basic.value,
        }

        if (isNaN(editData.account)) {
            this.setState({
                wrongAccount: true,
                wrongSalary: false,
                submitLoader: true,
            })
        } else if (isNaN(editData.basic)) {
            this.setState({
                wrongSalary: true,
                wrongAccount: false,
                submitLoader: true,
            })
        } else {
            axios.post(constant.BACKEND_URL + "update.php", editData)
                .then(res => {
                    console.log(res);         

                    if (res.data.status === true) {
                        alert("New Employee Added Successfully.");
                        this.setState({
                            payroll: true,
                        })
                    } else {
                        alert("Can't add Employee, please try again.");
                        this.setState({
                            submitLoader: true,
                        })
                    }
                });           
        }        
    }

    render() {
        let redirect = null;
        if (this.state.payroll === true) {
            redirect = <Redirect to="/payroll" />;
        }

        return(
            <div className="edit_profile">
            {redirect}
                <div>
                    <div>
                        <div className="edit_profile_close" onClick={this.props.click}>
                            &#x2715;
                        </div>
                        <p>
                            Edit Profile
                        </p>
                        <form onSubmit={this.submitProfile}>
                            <div className="edit_profile_container">
                            <div className="add_input">
                                <span>Full Name</span>
                                <div>
                                    <input type="text" ref={fname => this.fname = fname} defaultValue={this.state.editProfileValue.fname} required/>
                                </div>
                            </div>
    
                            <div className="add_input">
                                <span>Designation</span>
                                <div>
                                    <input type="text" ref={designation => this.designation = designation} defaultValue={this.state.editProfileValue.designation} required />
                                </div>
                            </div>
    
                            <div className="add_input">
                                <span>Bank</span>
                                <div>
                                <select ref={bank => this.bank = bank} required>
                                        <option>Access Bank</option>
                                        <option>FCMB</option>
                                        <option>GTBank</option>
                                        <option>Heritage Bank</option>
                                        <option>UBA</option>                   
                                        <option>Zenith Bank</option>                        
                                    </select>
                                </div>
                            </div>
    
                            <div className="add_input">
                                <span>Account Number</span>
                                <div>
                                    <input type="text" ref={account => this.account = account} defaultValue={this.state.editProfileValue.account} required />
                                </div>
                            </div>
    
                            <div className="add_input">
                                <span>Salary Type</span>
                                <div>
                                    <select ref={salary => this.salary = salary} required >
                                        <option>Per Hour</option>
                                        <option>Per Month</option>                 
                                    </select>
                                </div>
                            </div>
    
                            <div className="add_input">
                                <span>Basic Salary</span>
                                <div>
                                    <input type="text" ref={basic => this.basic = basic} style={{paddingLeft: '40px'}} defaultValue={this.state.editProfileValue.basic} required />
                                    <div>
                                        &#8358;
                                    </div>
                                </div>
                            </div> 
                            {
                                this.state.wrongAccount ?
                                <p style={{fontSize: '12px', color: 'red',fontStyle: 'italic'}}>
                                    Your account number must be digits.
                                </p>: null
                            }

                            {
                                this.state.wrongSalary?
                                <p style={{fontSize: '12px', color: 'red',fontStyle: 'italic'}}>
                                    Your salary must be digits.
                                </p>: null
                            }    
                            <div className="edit_profile_btn">
                                <div>
                                    <div className="edit__btn__inside">
                                    {
                                        this.state.submitLoader ? 
                                        <button>
                                            Save Changes
                                        </button>:
                                        <div>
                                            <div className="btn_loader">
                                                <div className="spinning">
                                                    <img src="/images/botton.png" alt="loading" />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    </div>
                                </div>
                                <div>
                                    {
                                        this.state.loader ? 
                                        <p onClick={this.showLoader}>
                                            Edit Full Profile
                                        </p>:
                                        <div className="edit_profile_loader">
                                            <div className="spinning">
                                            <img src="/images/loader.png" alt="" />
                                            </div>
                                        </div>
                                    }                                    
                                </div>
                            </div>
    
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        ) 
    }
           
}

export default EditProfile;