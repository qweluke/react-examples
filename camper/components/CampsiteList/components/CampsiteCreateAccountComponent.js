import React, {Component} from 'react';
import {connect} from 'react-redux';
import CampsiteService from "../../../services/api/CampsiteService";
import {Modal, Button, Form, Col} from 'react-bootstrap'
import {FormattedMessage, injectIntl} from "react-intl";
import {addCampsiteToCampsiteList, showCampsiteCreateAccountModal} from "../../../actions";
import AdminService from "../../../services/api/AdminService";


export const initForm = {
    'name': '',
    'email': '',
    'phone': '',
    'city': '',
    'street': '',
    'post_code': '',
    'is_active': '',
    'vat_no': '',
    'bank_account_no': ''
};

class CampsiteCreateAccountComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            disabled: false,
            statuses: [],
            form: initForm
        }
    }

    componentDidMount() {

        AdminService.activityTypesList()
            .then(response => {
                this.setState({
                    statuses: response
                })
            })

        CampsiteService.list()
            .then(response => {
                this.setState({
                    campsites: response
                })
            })
    }

    handleSubmit = event => {
        event.preventDefault();

        const { addCampsiteToCampsiteList} = this.props;
        const {form} = this.state;

        this.setState({
            disabled: true,
            error: null
        });

        CampsiteService.createCampsite(form)
            .then(response => {
                addCampsiteToCampsiteList(form);
                this.setState({
                    disabled: false,
                    form: initForm
                });
            })
            .catch(response => {
                this.setState({
                    disabled: false,
                    error: null
                });
            })

    }

    handleFormChange = (key, value) => {
        this.setState((prevState, props) => ({
            error: null,
            form: {
                ...prevState.form,
                [key]: value
            }
        }));
    }

    render() {
        const {intl, showCampsiteCreateAccountModal, isVisible} = this.props;
        const {disabled, statuses} = this.state;

        return (
            <Modal size="lg" show={isVisible} onHide={() => showCampsiteCreateAccountModal(false)} >
                <Form onSubmit={this.handleSubmit}>
                <Modal.Header>
                    <Modal.Title>
                        <FormattedMessage id='campsite.create_account.title' />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="group-item m-0">
                        <Form.Row>
                            <Form.Group as={Col} controlId="contactInfo.name">
                                <Form.Label>
                                    <FormattedMessage id='settings.tab.contact_info.form.name' />
                                </Form.Label>
                                <Form.Control
                                    required
                                    disabled={disabled}
                                    onChange={event => this.handleFormChange('name', event.target.value)}
                                    type="text" value={this.state.form.name} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="contactInfo.email">
                                <Form.Label>
                                    <FormattedMessage id='settings.tab.contact_info.form.email' />
                                </Form.Label>
                                <Form.Control
                                    required
                                    disabled={disabled}
                                    onChange={event => this.handleFormChange('email', event.target.value)}
                                    type="email" value={this.state.form.email}  />
                            </Form.Group>

                            <Form.Group as={Col} controlId="contactInfo.phone">
                                <Form.Label>
                                    <FormattedMessage id='settings.tab.contact_info.form.telephone' />
                                </Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    onChange={event => this.handleFormChange('phone', event.target.value)}
                                    type="text" value={this.state.form.phone} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="contactInfo.city">
                                <Form.Label>
                                    <FormattedMessage id='settings.tab.contact_info.form.city' />
                                </Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    onChange={event => this.handleFormChange('city', event.target.value)}
                                    type="text" value={this.state.form.city} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="contactInfo.street">
                                <Form.Label>
                                    <FormattedMessage id='settings.tab.contact_info.form.street' />
                                </Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    onChange={event => this.handleFormChange('street', event.target.value)}
                                    type="text" value={this.state.form.street} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="contactInfo.postCode">
                                <Form.Label>
                                    <FormattedMessage id='settings.tab.contact_info.form.post_code' />
                                </Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    onChange={event => this.handleFormChange('post_code', event.target.value)}
                                    type="text" value={this.state.form.post_code} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group className='col-2' controlId="contactInfo.active">
                                <Form.Label>
                                    <FormattedMessage id='settings.tab.contact_info.form.is_active' />
                                </Form.Label>
                                <Form.Control as="select" required disabled={disabled}
                                              value={this.state.form.status_id}
                                              onChange={event => this.handleFormChange('status_id', parseInt(event.target.value, 10))}
                                >
                                    {statuses.map(state => (
                                        <option key={state.id} value={state.id} >
                                            {intl.messages[state.key_name]}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="contactInfo.vatNo">
                                <Form.Label>
                                    <FormattedMessage id='settings.tab.contact_info.form.vat_no' />
                                </Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    onChange={event => this.handleFormChange('vat_number', event.target.value)}
                                    type="text" value={this.state.form.vat_number} />
                            </Form.Group>

                            <Form.Group as={Col} className='col-6' controlId="contactInfo.bankNo">
                                <Form.Label>
                                    <FormattedMessage id='settings.tab.contact_info.form.bank_account_no' />
                                </Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    onChange={event => this.handleFormChange('bank_account_number', event.target.value)}
                                    type="text" value={this.state.form.bank_account_number} />
                            </Form.Group>
                        </Form.Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="outline-primary" disabled={disabled} onClick={() => showCampsiteCreateAccountModal(false)}>
                        <FormattedMessage id='form.button.close' />
                    </Button>

                    <Button variant="primary" disabled={disabled} type='submit'>
                        <FormattedMessage id='form.button.submit' />
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        isVisible: state.campsiteCreateAccountModal.show
    }
};

const mapDispatchToProps = {
    addCampsiteToCampsiteList, showCampsiteCreateAccountModal
};

export default injectIntl(connect(
    mapStateToProps, mapDispatchToProps
)(CampsiteCreateAccountComponent));