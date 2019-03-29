import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Row, Tabs, Tab} from "react-bootstrap";
import {injectIntl, FormattedMessage} from "react-intl";
import './settings.css'
import ContactInfoComponent from "./components/ContactInfoComponent";
import PricingComponent from "./components/PricingComponent";
import GeneralComponent from "./components/GeneralComponent";
import PropertyCrudComponent from "./components/PropertyCrudComponent";
import {showCampsitePropertyCrud} from "../../actions";
import {withRouter} from "react-router-dom";

class Settings extends Component {

    componentDidMount() {
        const{showCampsitePropertyCrud} = this.props;

        showCampsitePropertyCrud(null)
    }

    render() {
        const {intl, showPropertyCrud, match} = this.props;

        return (
            <div className='content-wrapper'>

                <Row>
                    <Col>
                        <h1 className='section-title'>
                            <FormattedMessage id='settings.title' />
                        </h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="tabs-wrapper">
                            <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
                                <Tab eventKey="general" title={intl.messages['settings.tab.general.card_title']}>
                                    {!showPropertyCrud && <GeneralComponent subId={match.params.subId}/>}
                                    {showPropertyCrud && <PropertyCrudComponent />}
                                </Tab>
                                <Tab eventKey="pricing" title={intl.messages['settings.tab.pricing.card_title']}>
                                    <PricingComponent/>
                                </Tab>
                                <Tab eventKey="contact" title={intl.messages['settings.tab.contact_info.card_title']}>
                                    <ContactInfoComponent/>
                                </Tab>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        showPropertyCrud: state.settings.editedProperty
    }
};

const mapDispatchToProps = {
    showCampsitePropertyCrud
};

export default withRouter(injectIntl(connect(
    mapStateToProps,mapDispatchToProps
)(Settings)))