import React, { Component } from 'react';

export default class UpdatePassword extends Component {

    handleSendLinkEmail(e) {
        e.preventDefault();
        
        
        fetch('/sendEmail', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body:JSON.stringify({email:this.refs.email.value})
        }).then(res=>res.json()).then(data=>console.log(data))
        console.log(this.refs.email.value)
        this.refs.email.value = ''
        document.getElementById('sending').innerHTML = 'Look at your email'

    }


    render() {


        return (
            <div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Tap your Mail address</label>
                    <input ref="email" type="text" className="form-control" id="exampleInputPassword2"  />

                    <button type="submit" className="btn btn-primary" onClick={e => this.handleSendLinkEmail(e)}>Submit</button>
                    <p id="sending"></p>
                </div>
            </div>
        )
    }
}