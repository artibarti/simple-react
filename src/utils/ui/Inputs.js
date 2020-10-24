import React from 'react'
import { Input } from 'semantic-ui-react'
import './css/SimpleReactStyles.css'

export class ValidatedTextInput extends React.Component {

    render() {
        return (
            <div className="dw-text-input">
                <label>{this.props.title}</label>
                <Input id={this.props.id} fluid type={this.props.type} onChange={this.props.onchange} 
                    className={this.isValid() ? "" : "dw-invalid"} value={this.props.value}/>
                <div><small className="dw-error prevent-collapse-when-empty">{this.props.errormessage}</small></div>
            </div>
        );
    }

    isValid() {
        return (this.props.errormessage === null 
                || this.props.errormessage === undefined 
                || this.props.errormessage === '');
    }
}
