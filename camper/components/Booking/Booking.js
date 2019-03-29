import React, {Component} from 'react';
import {Table, Card, Col, Row} from "react-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import DatePicker, {registerLocale} from 'react-datepicker';
import './booking.css';
import moment from 'moment';
import ReservationCrud from "./components/ReservationCrud";
import {showBookingModalCrud} from "../../actions";
import {connect} from "react-redux";

class Booking extends Component {

    constructor(props) {
        super(props);

        const date = new Date();
        this.state = {
            date: date,
            days: this.daysInMonth(date)
        }
    }

    daysInMonth = date => {
        return new Array(moment(date).daysInMonth()).fill(null).map((x, i) => moment().startOf('month').add(i, 'days'));
    }

    handleDateChange = date => {

        this.setState( {
            date: date,
            days: this.daysInMonth(date)
        })
    }

    render() {
        const {intl: {messages}, showBookingModalCrud} = this.props;
        const {days} = this.state;

        const bookDays = [
            {name: 'lis major', dates: [1,2,3,4,5], status: 1},
            {name: 'Long name lorem ipsum', dates: [6,7], status: 1},
            {name: 'abcde fghij', dates: [10,11,12,13], status: 0}
        ]
        return (
            <div className='content-wrapper booking-wrapper'>

                <ReservationCrud/>
                <Row>
                    <Col>
                        <h1 className='section-title'>
                            <FormattedMessage id='booking.header'/>
                        </h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <div className="booking-view">
                                    <div className="booking-table-wrapper">
                                        <Table className='booking-table'>
                                            <thead>
                                            <tr>
                                                <th className='calendar'>
                                                    <DatePicker
                                                        onChange={date => this.handleDateChange(date)}
                                                        selected={this.state.date}
                                                        showMonthYearPicker
                                                        dateFormat="MMMM, YYYY"
                                                        placeholderText={messages['messages.table.date_from']}
                                                        className='form-control react-date-picker'
                                                    />
                                                </th>
                                                {days.map(date => {

                                                    return (
                                                        <th key={date.format('D')}>
                                                            <p>{date.format('ddd')}</p>
                                                            <p>{date.format('D')}</p>
                                                        </th>
                                                    )
                                                })}
                                            </tr>
                                            </thead>

                                            <tbody>


                                            <tr className="info">
                                                <td>TENTS</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td key={date.format('D')}>
                                                            {rand}%
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className='place'>
                                                <td>Place nr 0</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100);
                                                    const day = parseInt(date.format('D'), 10);
                                                    let test = bookDays.filter(bookDay => bookDay.dates.includes(day));

                                                    if(test.length) {
                                                        const dates = test[0].dates;
                                                        let {0 : firstDate ,[dates.length - 1] : lastDate} = dates;

                                                        if(day !== firstDate) {
                                                            return null;
                                                        }

                                                        return (
                                                            <td key={date.format('D')}
                                                                className={`booked ${test[0].status || 'not-payed'}`}
                                                                onClick={() => showBookingModalCrud(true)}
                                                                colSpan={dates.length}>
                                                                <div className='booked'>
                                                                    {test[0].name}
                                                                </div>
                                                            </td>
                                                        )
                                                    }

                                                    return (
                                                        <td key={date.format('D')}>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>
                                            <tr className='place'>
                                                <td>Place 2</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td key={date.format('D')}>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>
                                            <tr className='place'>
                                                <td>Place nr 3</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td key={date.format('D')}>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>
                                            <tr className='place'>
                                                <td>Place 4</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td key={date.format('D')}>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>
                                            <tr className='place'>
                                                <td>Place nr 5</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td key={date.format('D')}>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>



                                            <tr className="info">
                                                <td>TENTS</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td key={date.format('D')}>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className='place'>
                                                <td>Place nr 0</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td key={date.format('D')}>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>


                                            <tr className="info">
                                                <td>TENTS</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td key={date.format('D')}>
                                                            {rand}%
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className='place'>
                                                <td>Place nr 0</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td key={date.format('D')}>b
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>
                                            <tr className='place'>
                                                <td>Place 2</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>
                                            <tr className='place'>
                                                <td>Place nr 3</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>
                                            <tr className='place'>
                                                <td>Place 4</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>
                                            <tr className='place'>
                                                <td>Place nr 5</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>



                                            <tr className="info">
                                                <td>TENTS</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className='place'>
                                                <td>Place nr 0</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>


                                            <tr className="info">
                                                <td>TENTS</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            {rand}%
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className='place'>
                                                <td>Place nr 0</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>
                                            <tr className='place'>
                                                <td>Place 2</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>
                                            <tr className='place'>
                                                <td>Place nr 3</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>
                                            <tr className='place'>
                                                <td>Place 4</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>
                                            <tr className='place'>
                                                <td>Place nr 5</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>



                                            <tr className="info">
                                                <td>TENTS</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className='place'>
                                                <td>Place nr 0</td>
                                                {days.map(date => {
                                                    const rand = Math.floor(Math.random() * 100)

                                                    return (
                                                        <td>
                                                            ${rand}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr className="spacer">
                                                <td colSpan={32}></td>
                                            </tr>


                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapDispatchToProps = {
    showBookingModalCrud
};

export default injectIntl(connect(
    null, mapDispatchToProps
)(Booking));
