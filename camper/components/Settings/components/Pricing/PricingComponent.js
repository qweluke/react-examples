import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Col, Row, Table} from "react-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import AdminService from "../../../services/api/AdminService";
import './pricing.css'

class PricingComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            holidaysList: [],
            form: {}
        }
    }

    componentDidMount() {
        AdminService.holidaysList()
            .then(response => {
                this.setState({
                    holidaysList: response
                })
            })
    }

    handleSubmit = event => {
        event.preventDefault();


        alert('form submit handle needed!')
    }

    handleFormChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    render() {
        const {holidaysList} = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>

                <Table responsive hover className='pricing-table table-borderless'>
                    <thead>
                    <tr>
                        <th className='group-item'>
                            <Row className='no-gutters align-items-center'>
                                <Col className='col-7'><FormattedMessage
                                    id='settings.tab.pricing.form.base_price'/></Col>
                                <Col className='col-5'>
                                    <Form.Control type="text" placeholder="%"/>
                                </Col>
                            </Row>
                        </th>
                        <th className='align-middle'><FormattedMessage id='settings.tab.pricing.form.months.jan'/></th>
                        <th className='align-middle'><FormattedMessage id='settings.tab.pricing.form.months.feb'/></th>
                        <th className='align-middle'><FormattedMessage id='settings.tab.pricing.form.months.mar'/></th>
                        <th className='align-middle'><FormattedMessage id='settings.tab.pricing.form.months.apr'/></th>
                        <th className='align-middle'><FormattedMessage id='settings.tab.pricing.form.months.may'/></th>
                        <th className='align-middle'><FormattedMessage id='settings.tab.pricing.form.months.jun'/></th>
                        <th className='align-middle'><FormattedMessage id='settings.tab.pricing.form.months.jul'/></th>
                        <th className='align-middle'><FormattedMessage id='settings.tab.pricing.form.months.aug'/></th>
                        <th className='align-middle'><FormattedMessage id='settings.tab.pricing.form.months.sep'/></th>
                        <th className='align-middle'><FormattedMessage id='settings.tab.pricing.form.months.oct'/></th>
                        <th className='align-middle'><FormattedMessage id='settings.tab.pricing.form.months.nov'/></th>
                        <th className='align-middle'><FormattedMessage id='settings.tab.pricing.form.months.dec'/></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="spacer"></tr>

                    <tr className="group-item">
                        <td className='align-middle'><FormattedMessage id='settings.tab.pricing.form.month_extra'/>
                        </td>

                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                    </tr>

                    <tr className="spacer"></tr>

                    <tr className="group-item">
                        <td className='align-middle'><FormattedMessage id='settings.tab.pricing.form.weekend_extra'/>
                        </td>

                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                        <td><Form.Control type="text" placeholder="%"/></td>
                    </tr>


                    </tbody>
                </Table>


                <Row className='mt-3'>
                    <Col className='col-4'>
                        <Table responsive hover className='pricing-table table-borderless'>
                            <tbody>
                            {holidaysList.map((holiday) => (
                                <React.Fragment key={holiday.id}>
                                    <tr className="group-item">
                                        <td className='align-middle'>
                                            {holiday.name}
                                        </td>

                                        <td><Form.Control type="text" placeholder="%"/></td>
                                    </tr>
                                    <tr className="spacer"></tr>
                                </React.Fragment>
                            ))}
                            </tbody>
                        </Table>


                    </Col>
                    <Col className='col-9'>
                    </Col>
                </Row>

                <Row className='py-5 px-4'>
                    <Col>
                        <Button variant="outline-primary float-right ml-4">
                            <FormattedMessage id='form.button.cancel'/>
                        </Button>

                        <Button variant="primary float-right" type="submit">
                            <FormattedMessage id='settings.tab.pricing.form.update_pricing'/>
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

export default injectIntl(connect(
    mapStateToProps,
)(PricingComponent));