import * as React from 'react'

import {injectIntl} from "react-intl";
import DatePicker, {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './react-datepicker.css';

class ReactDatePicker extends React.Component {
    render() {
        const{intl} = this.props;

        return (
            <DatePicker
                {...this.props}
                dateFormat="YYYY-MM-dd HH:mm"
                className='form-control'
            />
        )
    }
}


export default injectIntl(ReactDatePicker)