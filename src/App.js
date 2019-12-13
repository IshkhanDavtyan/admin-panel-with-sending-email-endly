import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import './App.css';
import Registration from './components/registration/registration';
import Login from './components/login/login';
import Users from './components/users/users';
import Reports from './components/reports/reports';
import Notification from './components/notifications/notification';
import UpdatePassword from './components/updatePassword/UpdatePassword';
import ChangePassword from './components/updatePassword/changePassword';

export default class App extends Component {

  componentDidMount() {

    const exapmle = [{ token: null }]
    const exa = exapmle.filter(ex => {
      return ex.token !== null
    })
    exa.token = null
    console.log(exa)
  }

  handleDeleteCookie(e) {

    const token = document.cookie.replace('userToken=', '')
    const userToken = 'Bearer ' + token
    fetch('/logout', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `${userToken}` } },
    )
    document.cookie = "userToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"

    this.forceUpdate()


  }

  forceRendered = () => {
    this.forceUpdate()

  }
  render() {

    if (document.cookie) {
      return (
        <div className="App">
          <Router>
            <div>
              <ul>
                <li>
                  <Link to='/allReports'>Notifications</Link>
                </li>
                <li>
                  <Link to='/reports'>Add reports</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>

                <li>
                  <Link to="/login" onClick={e => this.handleDeleteCookie(e)}>Logout</Link>
                </li>
              </ul>
              <Route path='/allReports' component={Notification} />
              <Route path="/reports" component={Reports} />
              <Route path="/login" component={() => <Login forceRendering={this.forceRendered} />} />
              <Route path="/registration" component={Registration} />
              <Route path="/users" component={Users} />
              <Route path="/updatePassword" component={UpdatePassword} />
              <Route path="/changePassword" component={ChangePassword} />
            </div>
          </Router>
        </div>
      );
    } else {
      return (
        <Router>
          <div>
            <ul>

              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/registration">Registration</Link>
              </li>

            </ul>
            <Route path="/login" component={() => <Login forceRendering={this.forceRendered} />} />
            <Route path="/registration" component={Registration} />
            <Route path="/changePassword" component={ChangePassword} />
            <Route path="/updatePassword" component={UpdatePassword} />

          </div>
        </Router>
      )
    }
  }
}

