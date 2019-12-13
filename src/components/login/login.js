import React, { Component } from 'react';

export default class Login extends Component {

    loginUser(e) {
        e.preventDefault();
        const data = {
            email: this.refs.email.value,
            password: this.refs.password.value
        }

        const response = new Request('/login', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        })
        fetch(response).then(res => res.json()).then(data => {
            document.cookie = `userToken = ${data.token}`;
            this.props.forceRendering()
            window.location.href='/allReports'

        })
        console.log(this.props);
    }

    render() {
        console.log(document.cookie)
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input ref="email" type="text" className="form-control" id="exampleInputPassword" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input ref="password" type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <a href="/updatePassword"> Do you forget your password?</a>
                <button type="submit" className="btn btn-primary" onClick={this.loginUser.bind(this)}>Submit</button>
            </div>
        )
    }
}