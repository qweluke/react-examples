import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Card, Col, Row} from "react-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import CampsiteService from "../../services/api/CampsiteService";
import Link from "react-router-dom/es/Link";
import * as myConst from '../../constants'
import './campsiteList.css'
import {setCampsiteList} from "../../actions";
import {showCampsiteCreateAccountModal, showCampsiteCreateUserModal} from "../../actions";
import CampsiteCreateAccountComponent from "./components/CampsiteCreateAccountComponent";
import CampsiteCreateUserComponent from "./components/CampsiteCreateUserComponent";
import ReactiveTable from "../common/ReactiveTable";

class CampsiteList extends Component {

    componentDidMount() {
        const {setCampsiteList} = this.props;


        CampsiteService.list()
            .then(response => setCampsiteList(response))
    }


    render() {
        const {intl: {messages}, campsiteList, showCampsiteCreateAccountModal, showCampsiteCreateUserModal} = this.props;

        const tableColumns = [{
            Header: messages['campsite.list.campsite'] || 'campsite.list.campsite',
            accessor: 'name',
            minWidth: 300,
            Cell: row => (
                <span>{row.value}</span>
            )
        }, {
            Header: messages['campsite.list.email'] || 'campsite.list.email',
            accessor: 'email',
            className: 'text-center',
            minWidth: 150
        }, {
            sortable: false,
            filterable: false,
            header: '',
            minWidth: 140,
            className: 'action',
            id: 'actions',
            Cell: ({row}) => (
                <ButtonGroup>
                    <Link to={myConst.routes.campsite.settings.replace(':subId', row._original.sub)}
                          className="btn btn-link">
                        <FormattedMessage id='campsite.list.settings_btn' />
                    </Link>

                    <Button variant="link" onClick={() => showCampsiteCreateUserModal(row._original)}>
                        <FormattedMessage id='form.button.add_user' />
                    </Button>

                </ButtonGroup>
            )
        }];

        return (
            <div className='content-wrapper campsite-list-wrapper'>

                <CampsiteCreateAccountComponent />
                <CampsiteCreateUserComponent />

                <Row>
                    <Col>
                        <h1 className='section-title'>
                            <FormattedMessage id='campsite.list.header' />
                        </h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card >
                            <Card.Body>

                                    <Row className='mb-5'>
                                        <Col>
                                            <Button variant="primary" type="submit" onClick={() => showCampsiteCreateAccountModal(true)}>
                                                <FormattedMessage id='campsite.list.add_new'/>
                                            </Button>
                                        </Col>
                                    </Row>

                                    <ReactiveTable
                                        loading={!campsiteList}
                                        data={!campsiteList ? [] : campsiteList}
                                        columns={tableColumns}
                                    />


                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps({ campsiteData: {campsiteList}}) {
    return {
        campsiteList
    }
}

const mapDispatchToProps  ={
    showCampsiteCreateUserModal, showCampsiteCreateAccountModal, setCampsiteList
};

export default injectIntl(connect(
    mapStateToProps, mapDispatchToProps,
)(CampsiteList));