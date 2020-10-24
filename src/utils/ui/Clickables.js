import React from 'react';
import { Button as SemanticButton } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export class Button extends React.Component {

    render() {
        return (
            <SemanticButton {...this.props}>{this.props.title}</SemanticButton>
        );
    }
}

export class LinkButton extends React.Component {

    render() {
        return (
            <Link to={this.props.to} style={{ textDecoration: 'none' }}>
                <SemanticButton onClick={() => {}} {...this.props}>{this.props.title}</SemanticButton>
            </Link>
        );
    }
}
