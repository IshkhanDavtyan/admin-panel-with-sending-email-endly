import React, { Component } from 'react';
import './users.css'

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }



    async componentDidMount() {
        const token = document.cookie.replace('userToken=','');
        const userToken = 'Bearer '+ token
        console.log(token)
        console.log(userToken)
        await fetch('/allUsers',{headers:{'Content-Type':'application/json','Authorization':`${token}`}}).then(res => res.json()).then(data => this.setState({ users: data })).catch(e => console.log(e))

    }

     handleChangeRank = (number,e) => {
         e.preventDefault();
         const token = document.cookie.replace('userToken=','')
         const userToken = 'Bearer '+token
        // get input value
        const rank =  document.getElementsByClassName('rank')[number].value
        document.getElementsByClassName('rank')[number].value=''
        // get rank place
        const oldRank = this.state.users[number].rank
        document.getElementsByClassName('oldRank')[number].innerHTML = rank
        

        console.log(rank,oldRank)
        const data={
            // oldRank:oldRank,
            rank:rank
        }
            fetch('/users',{
                method:'PATCH',
                headers:new Headers({'Content-Type':'application/json', 'Authorization': `${userToken}`}),
                body:JSON.stringify(data)
            }).then(res=>res.json()).then(data=>console.log(data))
    

        
    }

    render() {
        let name = this.state.users.map(user => {
            
            return (
                <div className="users" key={this.state.users.indexOf(user)}>
                    <p>{user.name}</p>
                    <p>{user.lastname}</p>
                    <p className="oldRank">{user.rank}</p>
                    <input className="rank"/>
                    <button onClick={(e) => this.handleChangeRank(this.state.users.indexOf(user),e)}>Change rank</button>
                </div>
            )
        })
        return (
            <div >
                {name}
            </div>
        )

    }
}