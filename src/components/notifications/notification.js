import React, { Component } from 'react';

export default class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
            waitingNots:[]
        }
    }

    componentDidMount() {
        fetch('/allReports').then(res => res.json()).then(data => {
            const waitingNotes = data.filter(one=>{
                return one.isDone === undefined
            })
            this.setState({
                notifications:data,
                waitingNots:waitingNotes
            })

        })
   
    }

    handleAccessReport(index,_id,bool,e){
        e.preventDefault();

        const data = {
            _id,
            bool
        }
        const token = document.cookie.replace('userToken=','')
        const userToken = 'Bearer '+token
       
        fetch('/allReports',{
            method:"PATCH",
            headers:{'Content-Type':'application/json','Authorization':`${userToken}`},
            body:JSON.stringify(data)
        }).then(res=>res.json()).then(data=>console.log(data))
        document.getElementsByClassName('btn-success')[index].remove();
        document.getElementsByClassName('btn-danger')[index].remove();
        if(bool===true){
        document.getElementsByClassName('accessed')[index].innerHTML = 'Your report accessed'
        }
        else if(bool===false){
            document.getElementsByClassName('accessed')[index].innerHTML = 'Your report rejected'
        }
    }

    render() {

        const notAccessedNotifications = this.state.notifications.map(not => {
            if(not.isDone===undefined){
            return (
                <div key={this.state.notifications.indexOf(not)}>
                    {not.name} has create report which description is <b>{not.description}</b> .Its estimation is {not.estimation} and spent is {not.spent}
                    <button className="btn btn-success" onClick={e=>this.handleAccessReport(this.state.waitingNots.indexOf(not),not._id,true,e)}>Access</button>
                    <button className="btn btn-danger" onClick={e=>this.handleAccessReport(this.state.waitingNots.indexOf(not),not._id,false,e)}>Reject</button>
                    
                    <p className="accessed"></p>
                </div>
            )}

        })

        const accessedNotifications = this.state.notifications.map(not => {
            if(not.isDone){
            return (
                <div key={this.state.notifications.indexOf(not)}>
                    {not.name} has create report which description is <b>{not.description}</b> .Its estimation is {not.estimation} and spent is {not.spent}
                    <p >Notfifation accesed</p>
                </div>
            )}

        })

        const rejectedNotifications = this.state.notifications.map(not => {
            if(not.isDone===false){
            return (
                <div key={this.state.notifications.indexOf(not)}>
                    {not.name} has create report which description is <b>{not.description}</b> .Its estimation is {not.estimation} and spent is {not.spent}
                    <p >Notfifation Rejected</p>
                </div>
            )}

        })

        return (
            <div>
                <h1>Waiting for access or reject</h1>
                {notAccessedNotifications}
                <hr/>
                <h1>accessed</h1>
                {accessedNotifications}
                <hr/>
                <h1>rejected</h1>
                {rejectedNotifications}
            </div>
        )
    }
}