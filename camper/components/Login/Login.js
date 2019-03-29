import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import './loginPage.css'
import {injectIntl, FormattedMessage} from "react-intl";
import logoSVG from '../../assets/images/login-logo.svg';
import LoginForm from "./components/LoginForm";
import {connect} from "react-redux";
import PasswordChangeForm from "./components/PasswordChangeForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

class Login extends Component {

    render() {
        const {loginFormData} = this.props;

        return (
            <Container fluid className='h-100 login-page'>
                <Row className='h-100'>
                    <Col className='login-form-container align-self-center'>
                        <div id="wrapper">
                            <Row>
                                <Col>
                                    <img src={logoSVG} alt="logo"/>
                                </Col>
                            </Row>

                            <Row className='pt-5'>
                                <Col>
                                    <div className="welcome-text">
                                        <FormattedMessage id='login.welcome_text'/>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    {'login' === loginFormData.formType && <LoginForm/>}
                                    {'challenge' === loginFormData.formType && <PasswordChangeForm/>}
                                    {'pwReset' === loginFormData.formType && <ForgotPasswordForm/>}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col className='d-none d-lg-block login-bg-container'>
                        <div className="title-text">
                            <FormattedMessage id='login.title_text'/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginFormData: state.loginFormData,
        translations: state.translations,
    }
};

export default injectIntl(connect(mapStateToProps)(Login));