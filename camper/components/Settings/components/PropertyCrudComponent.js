import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Form, Button} from 'react-bootstrap'
import {FormattedMessage, injectIntl} from "react-intl";
import AdminService from "../../../services/api/AdminService";
import {setCampsiteObjectTypes, showCampsitePropertyCrud} from "../../../actions";
import CampsiteService from "../../../services/api/CampsiteService";
import InputTypeNumber from "../../common/InputTypeNumber/InputTypeNumber";

class PropertyCrudComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: props.property,
            invalidProperty: false,
            cabinFeatures: null
        }
    }

    componentDidMount() {
        const {objectTypes} = this.state;
        const {generalSettings, property, setCampsiteObjectTypes} = this.props;

        if (!objectTypes) {
            AdminService.objectTypesList().then(response => {
                setCampsiteObjectTypes(response)
            })
        }

        CampsiteService.featuresList(generalSettings.campsite_id, property.id)
            .then(response => {
                this.setState({
                    cabinFeatures: response
                })
            })
    }

    handleCabinFeatureChange = event => {
        const {featuresList} = this.props;
        const {cabinFeatures} = this.state;

        const featureId = parseInt(event.target.id, 10);
        const isChecked = event.target.checked;

        let value = cabinFeatures;

        if (isChecked) {
            const feature = featuresList.find(feature => feature.id === featureId);
            value.push({
                feature_id: feature.id,
                key_name: feature.key_name
            });
        } else {
            value = value.filter(cabinFeature => cabinFeature.feature_id !== featureId);
        }

        this.setState({
            cabinFeatures: value
        })
    };

    handleFormChange = (key, value) => {
        this.setState((prevState, props) => ({
            form: {
                ...prevState.form,
                [key]: value
            }
        }));
    };

    handleFormSubmit = event => {
        event.preventDefault();

        this.setState({
            invalidProperty: true
        })

    };

    render() {
        const {objectTypes, featuresList, intl, showCampsitePropertyCrud, property} = this.props;
        const {form, cabinFeatures} = this.state;

        return (
            <Form noValidate onSubmit={this.handleFormSubmit}>
                <Row>
                    <Col>
                        <FormattedMessage id='settings.tab.general.edit.title'/>
                    </Col>
                </Row>

                <Row>
                    <Col className='group-item'>
                        <Row>
                            <Col md={10} sm={12} className='align-self-center'>
                                {objectTypes.map((objectType, index) => (
                                    <Form.Check key={index}
                                                className='property-radio'
                                                inline
                                                disabled={form.id !== objectType.id}
                                                checked={form.id === objectType.id}
                                                value={objectType.id}
                                                isInvalid={this.state.invalidProperty}
                                                type="radio"
                                                label={intl.messages[objectType.key_name] || objectType.key_name}
                                                name='propertyType'
                                                id={`property-${objectType.id}`}
                                    />
                                ))}
                            </Col>
                            <Col md={2} sm={12}>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>
                                        <FormattedMessage id='settings.tab.general.amount'/>
                                    </Form.Label>
                                    <InputTypeNumber value={form.amount} id='formGroupEmail'
                                                     onChange={event => this.handleFormChange('amount', event.target.value)}/>

                                    {/*<Form.Control type="number" value={form.amount}*/}
                                                  {/*onChange={event => this.handleFormChange('amount', event.target.value)}/>*/}
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col>
                        <FormattedMessage id='settings.tab.general.edit.features'/>
                    </Col>
                </Row>

                <Row>
                    <Col className='group-item'>
                        <Row>
                            <Col className='align-self-center'>
                                {featuresList.map((feature) => {
                                    let isChecked = false;
                                    if (cabinFeatures) {
                                        isChecked = cabinFeatures.find(cabinFeature => cabinFeature.feature_id === feature.id);
                                    }

                                    return (
                                        <Form.Check key={feature.id}
                                                    className='property-checkbox'
                                                    checked={isChecked}
                                                    disabled={!cabinFeatures}
                                                    onChange={event => this.handleCabinFeatureChange(event)}
                                                    inline
                                                    type="checkbox"
                                                    label={intl.messages[feature.key_name] || feature.key_name}
                                                    id={feature.id}
                                        />
                                    )
                                })}
                            </Col>

                        </Row>
                    </Col>
                </Row>

                <Row className='py-5 px-4'>
                    <Col>
                        <Button variant="outline-primary float-right ml-4"
                                onClick={() => showCampsitePropertyCrud(null)}>
                            <FormattedMessage id='form.button.cancel'/>
                        </Button>

                        <Button variant="primary float-right" type="submit">
                            {!property && <FormattedMessage id='settings.tab.general.edit.add_cabin'/>}
                            {property && <FormattedMessage id='settings.tab.general.edit.save_cabin'/>}
                        </Button>

                    </Col>
                </Row>

            </Form>
        );
    }
}

function mapStateToProps({campsiteData: {objectTypes, featuresList}, settings}) {
    return {
        objectTypes,
        featuresList,
        property: settings.editedProperty,
        generalSettings: settings.general
    };
}

const mapDispatchToProps = {
    setCampsiteObjectTypes, showCampsitePropertyCrud
};

export default injectIntl(connect(
    mapStateToProps, mapDispatchToProps
)(PropertyCrudComponent));