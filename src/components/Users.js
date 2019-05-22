import React, { Component } from 'react';

class User extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    handleSignIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    handleSignOut() {
        this.props.firebase.auth().signOut();
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged((user) => {
            this.props.setUser(user);
          });
    }

    render() {
        return(
            <span className="User">
                { 
                    this.props.user == '' &&
                        <div className="userRow row">
                            <button type="button" className="UserButton col-5 btn btn-outline-success" onClick={() => this.handleSignIn()}>Sign In</button>
                        </div>
                }
                { 
                    this.props.user != '' &&
                        <div className="userRow row">
                            <p>Signed in as {this.props.user}</p>
                            <button onClick={() => this.handleSignOut()}>Sign Out</button>
                        </div> 
                }          
            </span>
        )
    }
}

export default User;