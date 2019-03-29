import React, {Component} from 'react';
import {Modal, Button, Row, Col, Container, Form} from 'react-bootstrap'
import {injectIntl, FormattedMessage} from "react-intl";
import './reservation.css'
import ReactDatePicker from "../../common/ReactDatePicker";
import {
    showBookingModalCrud
} from "../../../actions";
import {connect} from "react-redux";
import InputNumberType from "../../common/InputTypeNumber/InputTypeNumber";

class ReservationCrud extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            disabled: true
        }
    }

    handleEditBtn = () => {
        this.setState({
            disabled: false,
            editing: true
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
    }

    render() {
        const {intl: {messages}, reservation, showReservationCrud, showBookingModalCrud} = this.props;
        const {disabled} = this.state;

        return (
            <Modal
                show={showReservationCrud}
                onHide={() => showBookingModalCrud(false)}
                dialogClassName='reservation-modal'
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='reservation-header'>
                    <Container fluid>
                        <Row className='align-items-center'>
                            <Col className='reservation-status-text'>
                                {!reservation.id && <FormattedMessage id='reservation.modal.title.add' />}
                                {reservation.id && <FormattedMessage id='reservation.modal.title.pending' />}

                            </Col>
                            <Col className='reservation-price-text text-right'>
                                <FormattedMessage id='reservation.price_text' />
                                <span className="price">50</span>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Header>

                <Modal.Header className='reservation-details'>
                    <Container fluid>
                        <Row>
                            <Col xs={6}>
                                <Row>
                                    <Col md={12} className='reservation-place-header'>
                                        <FormattedMessage id='reservation.place_text' />
                                    </Col>
                                    <Col md={12} className='reservation-place-title'><span>
                                        Place nr 4
                                    </span></Col>
                                </Row>
                            </Col>
                            <Col xs={6} className='reservation-no-holder text-right'>
                                <Row>
                                    <Col md={12} className='reservation-no-header'>
                                        <FormattedMessage id='reservation.reservation_text' />
                                    </Col>
                                    <Col md={12} className='reservation-no-title'><span>CAMP-654321</span></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="reservation.checkIn">
                                <Form.Label>
                                    <FormattedMessage id='reservation.form.check_in' />
                                </Form.Label>
                                <ReactDatePicker
                                    disabled={disabled}
                                    dateFormat="DD MMM, YYYY"
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="reservation.checkOut">
                                <Form.Label>
                                    <FormattedMessage id='reservation.form.check_out' />
                                </Form.Label>
                                <ReactDatePicker
                                    calendarClassName='w-100'
                                    disabled={disabled}
                                    dateFormat="DD MMM, YYYY"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="reservation.firstName">
                                <Form.Label>
                                    <FormattedMessage id='reservation.form.first_name' />
                                </Form.Label>
                                <Form.Control type="text" disabled={disabled}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="reservation.lastName">
                                <Form.Label>
                                    <FormattedMessage id='reservation.form.last_name' />
                                </Form.Label>
                                <Form.Control type="text" disabled={disabled}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Col xs={4}>
                                <Form.Group as={Row} controlId="reservation.visitors">
                                    <Form.Label column sm={6}>
                                        <FormattedMessage id='reservation.form.visitors' />
                                    </Form.Label>
                                    <Col sm={6}>
                                        {/*<Form.Control type="number" disabled={disabled} />*/}
                                        <InputNumberType />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xs={8}>
                                <Form.Group as={Row} controlId="reservation.vehicleNo">
                                    <Form.Label column sm={6} className='text-sm-right'>
                                        <FormattedMessage id='reservation.form.vehicle_reg_no' />
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control type="text" disabled={disabled} />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Group as={Row} controlId="reservation.email">
                            <Form.Label column sm={2}>
                                <FormattedMessage id='reservation.form.email' />
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="email" disabled={disabled} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="reservation.phone">
                            <Form.Label column sm={2}>
                                <FormattedMessage id='reservation.form.phone' />
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" disabled={disabled} value='+48 322 225 225' />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="reservation.details">
                            <Form.Label column sm={2}>
                                <FormattedMessage id='reservation.form.details' />
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control as="textarea" rows="3" disabled={disabled} value='bla bla bla' />
                            </Col>
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary">
                        <FormattedMessage id='form.button.delete' />
                    </Button>

                    <Button variant="primary" type='button'>
                        <FormattedMessage id='reservation.form.btn.pay_link' />
                    </Button>

                    <Button variant="primary" type='button' onClick={() => this.handleEditBtn()} >
                        <FormattedMessage id='form.button.edit' />
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps({booking: {showReservationCrud, reservationCrud}}) {
    return {
        reservation: {
            id: reservationCrud.id,
            date_from: reservationCrud.date_from ? new Date(reservationCrud.date_from) : null,
            date_to: reservationCrud.date_to ? new Date(reservationCrud.date_to) : null,
            content: reservationCrud.content,
            status_id: reservationCrud.status_id
        },
        showReservationCrud
    };
}

const mapDispatchToProps = {
    showBookingModalCrud
};

export default injectIntl(connect(
    mapStateToProps, mapDispatchToProps
)(ReservationCrud));