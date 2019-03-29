import React, {Component} from 'react';
import './inputNumberType.css';

class InputTypeNumber extends Component {

    increase = () => {

    };

    decrease = () => {

    };

    render() {
        return (
            <span className="number-type">
                <div className="number-type-nav">
                    <input className='form-control' type="number" {...this.props}/>
                    <div className="number-type-button number-type-up" />
                    <div className="number-type-button number-type-down" />
                </div>
            </span>
        );
    }
}

export default InputTypeNumber;