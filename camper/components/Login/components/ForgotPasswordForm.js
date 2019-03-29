import React, {PureComponent} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import {connect} from "react-redux";
import SecurityService from "../../../services/api/SecurityService";
import {setLoginFormData} from "../../../actions";
import {withRouter} from 'react-router-dom';
import {Auth} from "../../../services/Auth";
import validatePassword from "../../../services/validators/passwordValidator";

class ForgotPasswordForm extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            email: '',
            verificationCode: '',
            password1: '',
            password2: '',
            errors: null,
            showVerificationInput: false
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        const {email, password1, password2, verificationCode, showVerificationInput} = this.state;
        const {history} = this.props;

        this.setState({
            disabled: true
        })

        // handle verification code & new password
        if (showVerificationInput) {

            const validatePw = validatePassword(password1, password2);

            if (!validatePw.valid) {

                switch (validatePw.reason) {
                    case 'passwordMismatch':
                        this.setState({
                            disabled: false,
                            password1: '',
                            password2: '',
                            errors: {
                                password1: 'user.password.password_mismatch'
                            }
                        });
                        break;
                    case 'passwordToWeak':
                        this.setState({
                            disabled: false,
                            password1: '',
                            password2: '',
                            errors: {
                                password1: 'user.password.password_mismatch'
                            }
                        });
                        break;
                    default:
                        this.setState({
                            disabled: false,
                            password1: '',
                            password2: '',
                            errors: {
                                password1: 'login.errors.unknownException'
                            }
                        });
                        break;
                }
                return;
            }

            SecurityService.passwordResetConfirmation(email, verificationCode, password1)
                .then(response => {
                    //when password changed user will be automatically logged in
                    SecurityService.login(email, password1)
                        .then(response => {
                            Auth.authenticate(response, () => {
                                history.push('/');
                            })
                        })
                })
                .catch(response => {
                    this.setState({
                        disabled: false,
                        errors: {
                            email: response.data.error_fields.message
                        },
                    })
                })

            return;
        }

        // handle resetting password
        SecurityService.passwordReset(email)
            .then(response => {
                this.setState({
                    disabled: false,
                    errors: null,
                    showVerificationInput: true
                })
            })
            .catch((response) => {
                this.setState({
                    disabled: false,
                    errors: {
                        email: response.data.error_fields.message
                    }
                });
            })
    };

    handleFormChange = (key, value) => {
        this.setState({
            [key]: value,
            error: null
        })
    };

    render() {
        const {setLoginFormData} = this.props;
        const {errors, showVerificationInput} = this.state;

        return (
            <Form className={`form-signin text-center`} onSubmit={this.handleSubmit}>

                <Form.Group controlId="formLogin">
                    <Form.Label>
                        <FormattedMessage id='login.form.email'/>
                    </Form.Label>
                    <Form.Control
                        disabled={this.state.disabled || this.state.showVerificationInput}
                        required autoFocus
                        onChange={event => this.handleFormChange('email', event.target.value)}
                        value={this.state.email}
                        type="email"
                    />
                    {errors && errors.email && this && <Form.Text className="is-invalid">
                        <FormattedMessage id={errors.email}/>
                    </Form.Text>}
                </Form.Group>

                {showVerificationInput &&
                <React.Fragment>
                    <Form.Group controlId="loginForm.code">
                        <Form.Label>
                            <FormattedMessage id='login.form.verificationCode'/>
                        </Form.Label>
                        <Form.Control
                            disabled={this.state.disabled}
                            required autoFocus
                            onChange={event => this.handleFormChange('verificationCode', event.target.value)}
                            value={this.state.verificationCode}
                            type="text"
                        />
                        {errors && errors.code && <Form.Text className="is-invalid">
                            <FormattedMessage id={errors.code}/>
                        </Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="loginForm.password1">
                        <Form.Label>
                            <FormattedMessage id='login.form.newPassword1'/>
                        </Form.Label>
                        <Form.Control
                            disabled={this.state.disabled}
                            onChange={event => this.handleFormChange('password1', event.target.value)}
                            value={this.state.password1}
                            type="password"
                        />
                        {errors && errors.password1 && <Form.Text className="is-invalid">
                            <FormattedMessage id={errors.password1}/>
                        </Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="loginForm.password2">
                        <Form.Label>
                            <FormattedMessage id='login.form.newPassword2'/>
                        </Form.Label>
                        <Form.Control
                            disabled={this.state.disabled}
                            onChange={event => this.handleFormChange('password2', event.target.value)}
                            value={this.state.password2}
                            type="password"
                        />
                    </Form.Group>
                </React.Fragment>
                }

                <Row className='mb-3'>
                    <Col className='w-100'>
                        <div className="password-reset" onClick={() => setLoginFormData({formType: 'login'})}>
                            <FormattedMessage id='form.button.cancel'/>
                        </div>
                    </Col>
                </Row>

                <button disabled={this.state.disabled}
                        className="btn btn-lg btn-primary btn-block btn-login" type="submit">
                    {!showVerificationInput && <FormattedMessage id='login.form.forgot_pw'/>}
                    {showVerificationInput && <FormattedMessage id='login.form.change_ppw_btn'/>}
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

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm)));
