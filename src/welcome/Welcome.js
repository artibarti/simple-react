import React from 'react'
import { Grid, Card, Form } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router-dom'
import { AuthenticationManager } from '../utils/AuthenticationManager'
import { ValidatedTextInput } from '../utils/ui/Inputs'
import { LinkButton, Button } from '../utils/ui/Clickables'
import { RequestHelper } from '../utils/RequestHelper'
import { ResponseParser } from '../utils/ResponseParsers'
import NonAuthenticatedComponentProxy from '../utils/NonAuthenticatedComponentProxy'

export default class Welcome extends React.Component {

    render() {
        return (
            <NonAuthenticatedComponentProxy>
                <WelcomeNavbar />
                <Grid padded>
                    <Grid.Row columns={1} centered>
                        <Grid.Column floated='right' mobile={14} computer={3}>
                            <Route path='/welcome/login' component={Login} />
                            <Route path='/welcome/register' component={Registration} />
                            <Route render={() => <Redirect to='/welcome/login' />} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </NonAuthenticatedComponentProxy>
        )
    }
}

class WelcomeNavbar extends React.Component {

    render() {
        return (
            <Grid padded className='dw-bg-mtavari'>
                <Grid.Row columns={1} verticalAlign='middle'>
                    <Grid.Column textAlign='center'>
                        <span className="dw-light dw-font-l">simple-react</span>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
   }
}

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            form: {
                email: '',
                password: '',
            },
            errorMessage: null,
        }

        this.doLogin = this.doLogin.bind(this);
        this.onChange = this.onChange.bind(this);
        this.LOGIN_URL = "/user/action/login";
    }

    render() {
        if (this.state.loginSuccess === true) {
            return <Redirect to="/home" />;
        } else {
            return (
                <Card fluid>
                    <Card.Header className='dw-pad-m'>
                        <h3>Sign In</h3>
                    </Card.Header>
                    <Card.Content>
                        <Form onSubmit={this.doLogin}>
                            <ValidatedTextInput id="email" title="Email address" value={this.state.form.email}
                                onchange={this.onChange} errormessage={this.state.errorMessage} type="text" />
                            <ValidatedTextInput id="password" title="Password" value={this.state.form.password}
                                onchange={this.onChange} type="password" />
                            <Button fluid type="submit" title="Sign In" />
                        </Form>
                        <LinkButton fluid to="/welcome/register" title="Sign Up" className="dw-margin-top-s" />
                    </Card.Content>
                </Card>
            );
        }
    }

    async doLogin(event) {
        event.preventDefault();
        RequestHelper.post(this.LOGIN_URL, { email: this.state.form.email, password: this.state.form.password })
            .then((response) => {
                AuthenticationManager.setAuthToken(response.headers["authorization"]);
                AuthenticationManager.setUserId(response.headers["user_id"]);
                this.setState({ loginSuccess: true });
            }, error => {
                this.setState({ password: '', errorMessage: 'Invalid credentials' });
            });
    }

    onChange(event) {
        let newForm = {};
        Object.assign(newForm, this.state.form);
        newForm[event.target.id] = event.target.value;
        this.setState({ form: newForm, errorMessage: '' });
    }
}

class Registration extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            emailError: null,
            passwordError: null,
            errorMessage: null,
        }

        this.REGISTRATION_URL = "/public/user/action/register";
        this.doRegister = this.doRegister.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        if (this.state.registrationSuccess === true) {
            return <Redirect to="/welcome/login" />;
        } else {
            return (
                <Card fluid>
                    <Card.Header className='dw-pad-m'>
                        <h3>Sign Up</h3>
                    </Card.Header>
                    <Card.Content>
                        <Form onSubmit={this.doRegister}>
                            <ValidatedTextInput id="email" title="Email address"
                                value={this.state.email} onchange={this.onChange}
                                errormessage={this.state.emailError} type="text" />
                            <ValidatedTextInput id="password" title="Password"
                                value={this.state.password} onchange={this.onChange}
                                errormessage={this.state.passwordError} type="password" />
                            <Button fluid type="submit" title="Register" />
                        </Form>
                        <LinkButton fluid to="/welcome/login" title="Sign in" className="dw-margin-top-s" />
                    </Card.Content>
                </Card>
            );
        }
    }

    async doRegister(event) {
        event.preventDefault();
        RequestHelper.post(this.REGISTRATION_URL, { "email": this.state.email, "password": this.state.password })
            .then((result) => {
                this.setState({ registrationSuccess: true });
            }).catch(error => {
                if (error.response.status === 422) {
                    this.parse422Response(error.response);
                }
            });
    }

    parse422Response(response) {
        let validationErrors = ResponseParser.parse422Response(response)
        this.setState({
            "emailError": validationErrors.emailError,
            "passwordError": validationErrors.passwordError
        });
    }

    onChange(event) {
        let newState = {};
        Object.assign(newState, this.state);
        newState[event.target.id] = event.target.value;
        newState['errorMessage'] = '';
        this.setState(newState);
    }
}
