import React, { Component } from 'react'

export default class Reports extends Component {

    constructor(props) {
        super(props)

        this.state = {
            reports: []
        }
    }

    handleSendReport() {
        const data = {
            name: this.refs.name.value,
            description: this.refs.description.value,
            estimation: this.refs.estimation.value,
            spent: this.refs.spent.value
        }
        console.log(data)
        const token = document.cookie.replace('userToken=','')
        const userToken = 'Bearer '+token
       

        fetch('/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization':`${userToken}` },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data =>{
            document.getElementById('message').innerHTML = data.message
            console.log(data)
        }).catch(e => console.log(e))

        this.refs.name.value = ''
        this.refs.description.value = ''
        this.refs.estimation.value = ''
        this.refs.spent.value = ''
    }



    render() {
        return (
            <div>
                <p>Name</p><input ref="name" />
                <p>description</p><input ref="description" />
                <p>estimation</p><input ref="estimation" />
                <p>spent</p><input ref="spent" />
                <p id="message"></p>
                <button className="btn btn-success" onClick={e => this.handleSendReport(e)}>Send</button>
            </div>
        )
    }
}