import React, { Component } from 'react';

import './registration.css'

 export default class Registration extends Component {

  constructor(props){
    super(props);
    this.state={
      user:[]
    }
  }

  handleCreateUser(e) {
    e.preventDefault();
    const data = {
      name: this.refs.name.value,
      lastname: this.refs.lastname.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      rank: this.refs.rank.value
    }
    const response = new Request('/registration', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    })
    fetch(response).then(res => res.json()).then(data =>{ 
      this.setState({user:data})
    })
    this.refs.name.value = ''
    this.refs.lastname.value = ''
    this.refs.email.value = ''
    this.refs.password.value = ''
    window.location.href = '/login'
  }
  

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input ref="name" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Lastname</label>
            <input ref="lastname" type="text" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input ref="password" type="text" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Email</label>
            <input ref="email" type="text" className="form-control" id="exampleInputPassword1" />
          </div>
          <label htmlFor="exampleInputPassword1">Rank</label>
          <select className="custom-select" id="inputGroupSelect01" ref="rank">
            <option value="Admin">Admin</option>
            <option value="PM">PM</option>
            <option value="developer">Developer</option>
          </select>
          <button type="submit" className="btn btn-primary" onClick={this.handleCreateUser.bind(this)} >Submit</button>
        </form>
      </div>)
  }
}
