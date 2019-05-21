import React, { Component } from 'react';
import Home from './Home';

class HomeSetting extends Component {
    state = {
        showValue: false,
    };

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                showValue: true,
            })       
        }, 5000);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        return (
            <div>
                <Home />
                <div className="detail_section">
                    <div className="container">
                        <div className="loader">
                            <img src="/images/loader.png" alt=""  className="spinning "/>
                        </div>
                        <p>
                            Hold on... fetching Your personal settings
                            <br /><br />
                            {
                                this.state.showValue ? 
                                <span style={{color: 'red'}}>You internet might be slow!!</span> : null
                            }
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeSetting;