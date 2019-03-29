import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap'
import CampsiteService from "../../../services/api/CampsiteService";
import {FormattedMessage, injectIntl} from "react-intl";
import {showCampsitePropertyCrud, setCampsiteObjectTypes, setSettingsData, setCampsiteFeaturesList} from '../../../actions'
import AdminService from "../../../services/api/AdminService";
import PropTypes from 'prop-types'
import ReactiveTable from "../../common/ReactiveTable";


class GeneralComponent extends Component {

    static propTypes = {
        subId: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const {setCampsiteObjectTypes, subId, setSettingsData, setCampsiteFeaturesList} = this.props;

        CampsiteService.generalSettings(subId)
            .then(response => setSettingsData('general', response));

        AdminService.objectTypesList()
            .then(response => setCampsiteObjectTypes(response))

        AdminService.featuresList()
            .then(response => setCampsiteFeaturesList(response))
    }

    render() {
        const {showCampsitePropertyCrud, objectTypes, intl, generalSettings} = this.props;

        const tableColumns = [{
            Header: intl.messages['settings.tab.general.property_type'] || 'settings.tab.general.property_type',
            accessor: 'type',
            className: 'text-center',
            Cell: row => (
                <span>{intl.messages[row.value]}</span>
            )
        }, {
            Header: intl.messages['settings.tab.general.amount'] || 'settings.tab.general.amount',
            accessor: 'amount',
            className: 'text-center',
        }, {
            sortable: false,
            filterable: false,
            header: '',
            minWidth: 140,
            className: 'action text-center',
            id: 'actions',
            Cell: ({row}) => (
                <ButtonGroup>
                    <Button variant="link" onClick={() => this.props.showCampsitePropertyCrud(row._original)}>
                        <FormattedMessage id='form.button.edit' />
                    </Button>
                </ButtonGroup>
            )
        }];

        return (
            <React.Fragment>
                {objectTypes.length !== generalSettings.properties.length && <Row className='mb-5'>
                    <Col>
                        <Button variant="primary" type="submit" onClick={() => showCampsitePropertyCrud(true)}>
                            <FormattedMessage id='settings.tab.general.add_new'/>
                        </Button>
                    </Col>
                </Row>}


                <ReactiveTable
                    loading={!generalSettings.properties}
                    data={!generalSettings.properties ? [] : generalSettings.properties}
                    columns={tableColumns}
                />


            </React.Fragment>
        );
    }
}

function mapStateToProps({settings: {general}, campsiteData: {objectTypes, featuresList}}) {
    return {
        objectTypes,
        featuresList,
        generalSettings: general
    };
}

const mapDispatchToProps = {
    showCampsitePropertyCrud, setCampsiteObjectTypes, setSettingsData, setCampsiteFeaturesList
};

export default injectIntl(connect(
    mapStateToProps, mapDispatchToProps
)(GeneralComponent));