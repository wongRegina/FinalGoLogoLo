import React, { Component } from 'react';

class Login extends Component {
    componentDidMount(){
        localStorage.setItem('User', this.props.match.params.id);
        console.log(localStorage.getItem('User'));
        window.location.href="/";
    }

    render() {
        return (<div>Login Success</div>);
    }
}

export default Login;