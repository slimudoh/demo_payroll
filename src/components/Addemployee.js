import React, { Component } from 'react';
import axios from 'axios';
import * as constant from './constant';
import { Redirect } from 'react-router-dom';

class AddEmployee extends Component {

    state = {
        loader: true,
        image: false,
        payroll: false,
        wrongAccount: false,
        wrongSalary: false,
        addProfileValue: {
            fname: "",
            gender: "",
            email: "",
            phone: "",
            bank: "",
            account: "",
            salary: "",
            basic: "",
            birth: "",
            join:"",
            depart: "",
            designation: "",
            job: "",
            status: ""
        }
    }

    submitEmployee = (event) => {
        event.preventDefault();

        this.setState({
            loader: false,            
        })

        const profileData = {
            fname: this.fname.value,
            gender: this.gender.value,
            email: this.email.value,
            phone:this.phone.value,
            bank: this.bank.value,
            account: this.account.value,
            salary: this.salary.value,
            basic: this.basic.value,
            birth: this.birth.value,
            join:this.join.value,
            depart: this.depart.value,
            designation: this.designation.value,
            job: this.job.value,
            status: "true",

            // fname: "Uwem Udoh",
            // gender: "male",
            // email: "demo@rovedana.com",
            // phone: "080765654256",
            // bank: "Zenith Bank",
            // account: Math.floor((Math.random() * 1000000000) + 1),
            // salary: "Per hour",
            // basic: "0989877",
            // birth: "2018-11-5",
            // join: "2018-11-5",
            // depart: "products",
            // designation: "Sales",
            // job: "to sell",
            // status: "true",
        }

        if (isNaN(profileData.account)) {
            this.setState({
                wrongAccount: true,
                wrongSalary: false,
                loader: true,
            })
        } else if (isNaN(profileData.basic)) {
            this.setState({
                wrongSalary: true,
                wrongAccount: false,
                loader: true,
            })
        } else {
            axios.post(constant.BACKEND_URL + "create.php", profileData)
            .then(res => {
                this.setState({
                    loader: true,
                    payroll: true,
                });

                if (res.data.status === true) {
                    alert("New Employee Added Successfully.");
                } else {
                    alert("Can't add Employee, please try again.")
                }
                
            })
            .catch(e => {
                console.log(e);
            }) 
        }   
    }

    getAvatar = (event) => {
        let ext =  event.target.value.split('.').pop(); 
        let target = event.target.value;

        if (target.trim() !== "") {
          if (ext.toLowerCase().trim() === "jpg" || ext.toLowerCase().trim() === "png" || ext.toLowerCase().trim() === "jpeg") {
              document.querySelector(".avatar > img").src = URL.createObjectURL(event.target.files[0]);
            this.setState({
                image: false,            
            })
          } else {
            this.setState({
                image: true,            
            })
          } 
        }  
    }

    render() {
        let redirect = null;
        if (this.state.payroll === true) {
            redirect = <Redirect to="/payroll" />;
        }

        return(
            <div className="add_employee" style={{paddingTop: '50px'}}>
            {redirect}
                <div className="add_employee_left">
                    <div>
                        <div className="avatar">
                            <img alt=""/>
                        </div>
                        <p>Upload Image</p>
                        <div className="avatar_input">
                            <input type="file"  onChange={this.getAvatar} />
                        </div>
                        {
                            this.state.image ? <span>Your Avatar must be jpeg or png file.</span> : null
                        }
                        
                    </div>
                </div>
                <form onSubmit={this.submitEmployee}>
                    <div className="add_employee_right">
                        <div>
                            <p>Add New Employee</p>
                            <div>
                                <p>Basic Details</p>
                                <div>
                                    <div className="add_input">
                                        <span>Full Name</span>
                                        <div>
                                            <input type="text" ref={fname => this.fname = fname} defaultValue={this.state.addProfileValue.fname}  required/>
                                        </div>
                                    </div>
        
                                    <div className="add_input">
                                        <span>Gender</span>
                                        <div>
                                            <select ref={gender => this.gender = gender} defaultValue={this.state.addProfileValue.gender} required >
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </div>
                                    </div>
        
                                    <div className="add_input">
                                        <span>Email</span>
                                        <div>
                                            <input type="text" ref={email => this.email = email} defaultValue={this.state.addProfileValue.email}  required />
                                        </div>
                                    </div>
        
                                    <div className="add_input">
                                        <span>Phone Number</span>
                                        <div>
                                            <input type="text" ref={phone => this.phone = phone} defaultValue={this.state.addProfileValue.phone} required />
                                        </div>
                                    </div>
        
                                    <div className="add_input">
                                        <span>Bank</span>
                                        <div>
                                            <select ref={bank => this.bank = bank} defaultValue={this.state.addProfileValue.bank} required >
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
                                            <input type="text" ref={account => this.account = account} defaultValue={this.state.addProfileValue.account}  required />
                                        </div>
                                    </div>
        
                                    <div className="add_input">
                                        <span>Salary Type</span>
                                        <div>
                                            <select ref={salary => this.salary = salary} defaultValue={this.state.addProfileValue.salary} required >
                                                <option>Per Hour</option>
                                                <option>Per Month</option>                 
                                            </select>
                                        </div>
                                    </div>
        
                                    <div className="add_input">
                                        <span>Basic Salary</span>
                                        <div>
                                            <input type="text" ref={basic => this.basic = basic} style={{paddingLeft: '40px'}} defaultValue={this.state.addProfileValue.basic} required />
                                            <div>
                                            &#8358;
                                            </div>
                                        </div>
                                        
                                    </div>
        
                                    <div className="add_input">
                                        <span>Date of Birth</span>
                                        <div>
                                            <input type="date" ref={birth => this.birth = birth} defaultValue={this.state.addProfileValue.birth}  required />
                                        </div>
                                    </div>
        
                                    <div className="add_input">
                                        <span>Date of Joinning</span>
                                        <div>
                                            <input type="date" ref={join => this.join = join} defaultValue={this.state.addProfileValue.join} required  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Role</p>
                                <div>
                                <div className="add_input">
                                        <span>Department</span>
                                        <div>
                                            <input type="text" ref={depart => this.depart = depart} defaultValue={this.state.addProfileValue.depart} required />
                                        </div>
                                    </div>
        
                                    <div className="add_input">
                                        <span>Designation</span>
                                        <div>
                                            <input type="text" ref={designation => this.designation = designation} defaultValue={this.state.addProfileValue.designation}  required />
                                        </div>
                                    </div>
        
                                    <div className="add_input_text">
                                        <span>Job Description</span>
                                        <div>
                                            <textarea ref={job => this.job = job} defaultValue={this.state.addProfileValue.job} required></textarea>
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
        
                                    <div className="add_input_btn">
                                        <div>
                                            {
                                                this.state.loader ?
                                                <button>Create</button>:
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
        
                                </div>
                            </div>
                        </div>
                    </div> 
                </form>           
            </div>
        )
    }
}

export default AddEmployee;