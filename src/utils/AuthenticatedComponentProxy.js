import React from 'react'
import { AuthenticationManager } from "./AuthenticationManager";
import { Redirect } from "react-router-dom";

export default class AuthenticatedComponentProxy extends React.Component {

    render() {
        return AuthenticationManager.hasToken() 
            ? <div {...this.props}>{this.props.children}</div> 
            : <Redirect to="/welcome/login" />;
    }
}
