import React, {PureComponent} from 'react';
import {Form, Row, Col} from "react-bootstrap";
import {injectIntl, FormattedMessage} from "react-intl";
import SecurityService from "../../../services/api/SecurityService";
import {setLoginFormData} from "../../../actions";
import {connect} from "react-redux";
import {Auth} from "../../../services/Auth";
import {withRouter} from 'react-router-dom';

class LoginForm extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: null,
            disabled: false
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        const {username, password} = this.state;
        const {history, setLoginFormData} = this.props;

        this.setState({
            disabled: true
        })

        SecurityService.login(username, password)
            .then(response => {

                this.setState({
                    errors: null
                });

                if (200 === response.status && response.message === 'AuthChallenge' && response.challenge_name === 'NEW_PASSWORD_REQUIRED') {
                    // we are switching current component to PasswordChangeForm
                    setLoginFormData({
                        session: response.session,
                        cognito_sub: response.cognito_sub,
                        formType: 'challenge'
                    })
                }

                if (201 === response.status) {
                    Auth.authenticate(response,() => {
                        history.push('/');
                    })
                }
            })
            .catch((response) => {
                this.setState({
                    disabled: false,
                    errors: {
                        email: response.data.error_fields.message
                    },
                })
            })
    }

    handleFormChange = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    render() {
        const {setLoginFormData} = this.props;
        const {errors} = this.state;

        return (
            <Form className={`form-signin`} onSubmit={this.handleSubmit}>

                <Form.Group controlId="loginForm.email">
                    <Form.Label>
                        <FormattedMessage id='login.form.email'/>
                    </Form.Label>
                    <Form.Control
                        disabled={this.state.disabled}
                        required autoFocus
                        onChange={event => this.handleFormChange('username', event.target.value)}
                        value={this.state.username}
                        type="text"
                    />
                    {errors && errors.email && <Form.Text className="is-invalid">
                        <FormattedMessage id={errors.email} />
                    </Form.Text>}
                </Form.Group>

                <Form.Group controlId="loginForm.password">
                    <Form.Label>
                        <FormattedMessage id='login.form.password'/>
                    </Form.Label>
                    <Form.Control
                        disabled={this.state.disabled}
                        autoComplete='password'
                        required
                        onChange={event => this.handleFormChange('password', event.target.value)}
                        value={this.state.password}
                        type="password"
                    />
                </Form.Group>
                <Row className='mb-3'>
                    <Col className='w-100'>
                        <div className="password-reset" onClick={() => setLoginFormData({formType:'pwReset'})}>
                            <FormattedMessage id='login.form.passwordReset' />
                        </div>
                    </Col>
                </Row>
                <button className="btn btn-lg btn-primary btn-block btn-login" type="submit"
                        disabled={this.state.disabled}>
                    <FormattedMessage id='login.form.login_btn'/>
                </button>
            </Form>
        );
    }
}

const mapDispatchToProps = {
    setLoginFormData
};

export default withRouter(injectIntl(connect(null, mapDispatchToProps)(LoginForm)));