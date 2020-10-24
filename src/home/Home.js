import React from 'react'
import { AuthenticationManager } from '../utils/AuthenticationManager';
import { Grid, Icon, Image } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import AuthenticatedComponentProxy from '../utils/AuthenticatedComponentProxy';

export class Home extends React.Component {

    render() {
        return (
            <AuthenticatedComponentProxy>
                <HomeNavbar />
                <div>This is the home component</div>
            </AuthenticatedComponentProxy>
        )
    }
}

class HomeNavbar extends React.Component {

    constructor() {
        super();
        this.state = {
            redirectToLogin: false,
        };

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        AuthenticationManager.logout();
        this.setState({redirectToLogin: true});
    }

    render() {

        if (this.state.redirectToLogin) {
            return <Redirect to="/welcome/login" />
        }

        return (
            <Grid padded className='dw-bg-mtavari'>
                <Grid.Row columns={3}>
                    <Grid.Column width={7} textAlign='left' verticalAlign="middle">
                    </Grid.Column>
                    <Grid.Column width={2} textAlign='center'>
                        <Link to="/home" className="dw-light dw-font-l">simple-react</Link>
                    </Grid.Column>
                    <Grid.Column width={7} textAlign='right' verticalAlign="middle">
                        <Icon name='sign out alternate' size='large' className='dw-light' onClick={this.onLogout} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
