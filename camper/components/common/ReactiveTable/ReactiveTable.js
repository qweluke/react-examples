import * as React from 'react'
import ReactTable from 'react-table'
import './ract-table.css'
import {injectIntl} from "react-intl";

class ReactiveTable extends React.Component {
    render() {
        const{intl} = this.props;

        const {
            loading = false,
            filterable = false,
            columns = [],
            data ,
            defaultPageSize = 5,
        } = this.props;

        return (
            <ReactTable
                {...this.props}
                loading={loading}
                filterable={filterable}
                defaultPageSize={defaultPageSize}
                data={data}
                columns={columns}
                previousText = {intl.messages['messages.table.pagination.previous_text']}
                nextText = {intl.messages['messages.table.pagination.next_text']}
                loadingText = {intl.messages['messages.table.pagination.loading_tex']}
                noDataText = {intl.messages['messages.table.pagination.no_data_tex']}
                pageText = {intl.messages['messages.table.pagination.page_tex']}
                ofText = {intl.messages['messages.table.pagination.of_tex']}
                rowsText = {intl.messages['messages.table.pagination.rows_tex']}
                pageJumpText = {intl.messages['messages.table.pagination.page_jump_text']}
                rowsSelectorText = {intl.messages['messages.table.pagination.rows_selector_text']}
            />
        )
    }
}


export default injectIntl(ReactiveTable)