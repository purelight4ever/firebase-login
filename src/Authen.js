import React, { Component } from 'react';
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


var config = {
   apiKey: "AIzaSyBTp_0WuNdzwmbZ0kHAdeQeLl6S4qb9SaU",
   authDomain: "usurvey-28d78.firebaseapp.com",
   databaseURL: "https://usurvey-28d78.firebaseio.com",
   projectId: "usurvey-28d78",
   storageBucket: "usurvey-28d78.appspot.com",
   messagingSenderId: "521947117409"
 };
 firebase.initializeApp(config);

class Authen extends Component {
  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.default.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user => {
      var lout = document.getElementById('logout');
      //TODO: write a Welcome message
      lout.classList.remove('hide');
      var err = "Welcome back "+ email;
      firebase.database().ref('users/'+user.uid).set({
        email: {email}
    });
    console.log(user);
    this.setState({err: err});

    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err:err});
    });
  });
  document.getElementById("email").value = "";
  document.getElementById("pass").value = "";
}
  signup(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.default.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise.then(user => {
      var err = "Welcome "+ email;
      firebase.database().ref('users/'+user.uid).set({
        email: {email}
      });
      console.log(user);
      this.setState({err: err});
    });
    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
    var lout = document.getElementById('logout');
    lout.classList.remove('hide');
    document.getElementById("email").value = "";
    document.getElementById("pass").value = "";
  }
  logout(){
    firebase.auth().signOut();
    var lout = document.getElementById('logout');
    lout.classList.add('hide');
    var err = "Thank you ";
    this.setState({err: err});
    document.getElementById("email").value = "";
    document.getElementById("pass").value = "";
  }

  constructor(props){
    super(props);
    this.state= {
      err: ''
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
  }
  render () {
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your email" /><br />
        <input id="pass" ref="password" type="password" placeholder="Enter your password" /><br />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.logout} id="logout" className="hide">Log Out</button>
      </div>
    );

  }
}

export default Authen;
