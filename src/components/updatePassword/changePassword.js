import React, { Component } from 'react';

export default class ChangePassword extends Component {

    handleUpdatePassword(e) {
        e.preventDefault();
        const data = { password: this.refs.password.value };
        var url = window.location.search
        console.log(window)

        const any = fetch(`/changePassword${url}`, {
            method: 'PATCH',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => console.log(data))
        // window.location.href = '/login'
        console.log(this.refs.password.value)
        console.log(any)
    }


    render() {


        return (
            <div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Tap your new password</label>
                    <input ref="password" type="text" className="form-control" id="exampleInputPassword2" />

                    <button type="submit" className="btn btn-primary" onClick={e => this.handleUpdatePassword(e)}>Submit</button>
                </div>
            </div>
        )
    }
}