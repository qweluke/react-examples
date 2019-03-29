import React, {Component} from 'react';
import {connect} from 'react-redux';
import CampsiteService from "../../../services/api/CampsiteService";
import {Modal, Button, Form, Col, Row} from 'react-bootstrap'
import {FormattedMessage, injectIntl} from "react-intl";
import {showCampsiteCreateUserModal} from "../../../actions";

class CampsiteCreateUserComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            error: null,
            disabled: false
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        const {campsiteCreateUserModal} = this.props;

        this.setState({
            disabled: true,
            error: null
        });
        const {email} = this.state;


        CampsiteService.createAccount(email, campsiteCreateUserModal.id)
            .then(response => {
                this.setState({
                    disabled: false,
                    email: ''
                })
            })
            .catch(response => {
                this.setState({
                    disabled: false,
                    error: response.data.error_fields.message
                })
            })
    }

    componentDidMount() {
    }

    handleFormChange = (key, value) => {
        this.setState({
            error: null,
            [key]: value
        })
    }

    render() {
        const {intl, showCampsiteCreateUserModal, campsiteCreateUserModal} = this.props;
        const {email, disabled, error} = this.state;

        if(!campsiteCreateUserModal) {
            return null;
        }
        return (
            <Modal show={campsiteCreateUserModal} onHide={() => showCampsiteCreateUserModal(false)} >
                <Modal.Header>
                    <Modal.Title>
                        <FormattedMessage id='campsite.list.create_user_modal.title' />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Row className='mb-3'>
                            <Col>
                                <h5>Campsite: {campsiteCreateUserModal.name}</h5>
                            </Col>
                        </Row>
                        <Form.Row>
                            <Col sm={12}>

                            </Col>
                            <Col sm={10}>
                                <Form.Group controlId="userCreateForm.email">
                                    <Form.Control type="email"
                                                  required
                                                  value={email}
                                                  disabled={disabled}
                                                  onChange={event => this.handleFormChange('email', event.target.value)}
                                                  placeholder={intl.messages['campsite.create_user_modal.email_placeholder']} />
                                </Form.Group>

                            </Col>
                            <Col sm={2}>
                                <Button type='submit' variant="primary" disabled={disabled}>
                                    <FormattedMessage id='form.button.add' />
                                </Button>
                            </Col>
                        </Form.Row>
                        {error && <Form.Row>
                            <Col>
                                <div className="text-danger">
                                    <FormattedMessage id={error} />
                                </div>
                            </Col>
                        </Form.Row>}
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={() => showCampsiteCreateUserModal(false)}>
                        <FormattedMessage id='form.button.close' />
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        campsiteCreateUserModal: state.campsiteCreateUserModal.campsite
    }
};

const mapDispatchToProps = {
    showCampsiteCreateUserModal
};

export default injectIntl(connect(
    mapStateToProps, mapDispatchToProps
)(CampsiteCreateUserComponent));