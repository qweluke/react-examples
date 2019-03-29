import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Col, Row} from "react-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import AdminService from "../../../services/api/AdminService";
import CampsiteService from "../../../services/api/CampsiteService";
import { withRouter } from "react-router";

class ContactInfoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            disabled: false,
            statuses: [],
            contactInfo: null,
            form: {}
        }
    }

    componentDidMount() {
        const {match} = this.props;

        CampsiteService.contactInfo(match.params.subId)
            .then(response => {
                this.setState({
                    form: {...response},
                    contactInfo: response
                })
            })

        AdminService.activityTypesList()
            .then(response => {
                this.setState({
                    statuses: response
                })
            })
    }

    handleSubmit = event => {
        event.preventDefault();
        const{form} = this.state;

        this.setState({
            disabled: true
        })
        CampsiteService.contactInfoSave(
            form.campsite_id,
            {...form}
        )
            .then((response => {
                this.setState({
                    contactInfo: form
                })
            }))
            .catch((response) => {
                const errors = [];
                const keys = Object.keys(response.data.error_fields);
                keys.map(key => errors.push(response.data.error_fields[key]));
                this.setState({
                    errors: errors
                })
            });

        this.setState({
            disabled: false
        })
    }

    handleFormChange = (key, value) => {
        this.setState((prevState, props) => ({
            form: {
                ...prevState.form,
                [key]: value
            }
        }));
    }

    resetFormDefaults = () => {
        this.setState((prevState, props) => ({
            form: {
                ...prevState.contactInfo
            }
        }));
    }

    render() {
        const {intl} = this.props;
        const {statuses, contactInfo, errors, disabled} = this.state;

        if(!statuses || !contactInfo) {
            return (
                <Row>
                    <Col className='text-center p-5'>
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </Col>
                </Row>
            )

        }
        return (

            <Form onSubmit={this.handleSubmit}>

                <div className="group-item m-0">
                    <Form.Row>
                        <Form.Group as={Col} controlId="contactInfo.name">
                            <Form.Label>
                                <FormattedMessage id='settings.tab.contact_info.form.name' />
                            </Form.Label>
                            <Form.Control
                                onChange={event => this.handleFormChange('name', event.target.value)}
                                disabled={disabled}
                                type="text" value={this.state.form.name || ''} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="contactInfo.email">
                            <Form.Label>
                                <FormattedMessage id='settings.tab.contact_info.form.email' />
                            </Form.Label>
                            <Form.Control
                                onChange={event => this.handleFormChange('email', event.target.value)}
                                disabled={disabled}
                                type="email" value={this.state.form.email || ''}  />
                        </Form.Group>

                        <Form.Group as={Col} controlId="contactInfo.phone">
                            <Form.Label>
                                <FormattedMessage id='settings.tab.contact_info.form.telephone' />
                            </Form.Label>
                            <Form.Control
                                onChange={event => this.handleFormChange('phone', event.target.value)}
                                disabled={disabled}
                                type="text" value={this.state.form.phone || ''} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="contactInfo.city">
                            <Form.Label>
                                <FormattedMessage id='settings.tab.contact_info.form.city' />
                            </Form.Label>
                            <Form.Control
                                onChange={event => this.handleFormChange('city', event.target.value)}
                                disabled={disabled}
                                type="text" value={this.state.form.city || ''} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="contactInfo.street">
                            <Form.Label>
                                <FormattedMessage id='settings.tab.contact_info.form.street' />
                            </Form.Label>
                            <Form.Control
                                onChange={event => this.handleFormChange('street', event.target.value)}
                                disabled={disabled}
                                type="text" value={this.state.form.street || ''} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="contactInfo.postCode">
                            <Form.Label>
                                <FormattedMessage id='settings.tab.contact_info.form.post_code' />
                            </Form.Label>
                            <Form.Control
                                onChange={event => this.handleFormChange('post_code', event.target.value)}
                                disabled={disabled}
                                type="text" value={this.state.form.post_code || ''} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group className='col-2' controlId="contactInfo.active">
                            <Form.Label>
                                <FormattedMessage id='settings.tab.contact_info.form.is_active' />
                            </Form.Label>
                            <Form.Control as="select"
                                          disabled={disabled}
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
                                onChange={event => this.handleFormChange('vat_number', event.target.value)}
                                disabled={disabled}
                                type="text" value={this.state.form.vat_number || ''} />
                        </Form.Group>

                        <Form.Group as={Col} className='col-6' controlId="contactInfo.bankNo">
                            <Form.Label>
                                <FormattedMessage id='settings.tab.contact_info.form.bank_account_no' />
                            </Form.Label>
                            <Form.Control
                                onChange={event => this.handleFormChange('bank_account_number', event.target.value)}
                                disabled={disabled}
                                type="text" value={this.state.form.bank_account_number || ''} />
                        </Form.Group>
                    </Form.Row>

                    {errors.map((error, index) => (<Form.Row key={index}>
                        <Col>
                            <div className="text-danger">
                                <FormattedMessage id={error}/>
                            </div>
                        </Col>
                    </Form.Row>))}
                </div>

                <Row className='py-5 px-4'>
                    <Col>
                        <Button disabled={disabled}
                                variant="outline-primary float-right ml-4" onClick={this.resetFormDefaults}>
                            <FormattedMessage id='form.button.cancel' />
                        </Button>

                        <Button disabled={disabled} variant="primary float-right" type="submit">
                            <FormattedMessage id='form.button.save' />
                        </Button>

                    </Col>
                </Row>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(injectIntl(connect(
    mapStateToProps,
)(ContactInfoComponent)));