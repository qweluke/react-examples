import React, {PureComponent} from 'react';
import {Form} from "react-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import {connect} from "react-redux";
import SecurityService from "../../../services/api/SecurityService";
import {setLoginFormData} from "../../../actions";
import {withRouter} from 'react-router-dom';
import {Auth} from "../../../services/Auth";
import validatePassword from "../../../services/validators/passwordValidator";

class PasswordChangeForm extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            password1: '',
            password2: '',
            error: null
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        const {password1, password2} = this.state;
        const {history, loginFormData} = this.props;

        const validatePw = validatePassword(password1, password2);

        if (!validatePw.valid) {
            this.setState({
                password1: '',
                password2: '',
                error: validatePw.message
            });
            return;
        }

        this.setState({
            disabled: true
        })

        SecurityService.userChallenge(password1, loginFormData.session, loginFormData.cognito_sub)
            .then(response => {
                if (201 === response.status) {
                    Auth.authenticate(response,() => {
                        history.push('/');
                    })
                }
            })
            .catch((response) => {
                this.setState({
                    disabled: false
                })
            })
    };


    handleFormChange = (key, value) => {
        this.setState({
            [key]: value,
            error: null
        })
    };

    render() {

        return (
            <Form className={`form-signin text-center`} onSubmit={this.handleSubmit}>

                <Form.Group controlId="loginForm.password1">
                    <Form.Label>
                        <FormattedMessage id='login.form.newPassword1'/>
                    </Form.Label>
                    <Form.Control
                        disabled={this.state.disabled}
                        required autoFocus
                        autoComplete='password'
                        onChange={event => this.handleFormChange('password1', event.target.value)}
                        value={this.state.password1}
                        type="password"
                    />
                    {this.state.error && <Form.Text className="is-invalid">
                        <FormattedMessage id={this.state.error}/>
                    </Form.Text>}
                </Form.Group>

                <Form.Group controlId="loginForm.password2">
                    <Form.Label>
                        <FormattedMessage id='login.form.newPassword2'/>
                    </Form.Label>
                    <Form.Control
                        disabled={this.state.disabled}
                        required
                        onChange={event => this.handleFormChange('password2', event.target.value)}
                        value={this.state.password2}
                        type="password"
                    />
                </Form.Group>

                <button disabled={this.state.disabled}
                        className="btn btn-lg btn-primary btn-block btn-login" type="submit">
                    <FormattedMessage id='login.form.change_pw_btn'/>
                </button>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginFormData: state.loginFormData
    }
};

const mapDispatchToProps = {
    setLoginFormData
};

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PasswordChangeForm)));
