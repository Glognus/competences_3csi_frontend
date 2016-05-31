import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import GroupService from '../../../services/GroupService.js'
import NotificationSystem from 'react-notification-system'
class ListExamens extends React.Component {

    // - Constructor
    constructor(props) {
        super(props);
        this.state = {examens: [], currentRequest:null};
    }

    // - Called when the component receives his new props
    componentWillReceiveProps(nextProps) {
        if(nextProps.group){
            this.getExamens(nextProps.group.id);
        }
    }

    // -
    componentWillUnmount() {
        if(this.state.currentRequest != null) {
            this.state.currentRequest.abort();
        }
    }

    // - Retrieves the examens related to the current group
    getExamens(groupID) {

        var that = this;
        var req = GroupService.getExamens(groupID, function (result) {
            that.setState({
                examens: result
            })
        });
        this.setState({currentRequest:req});
    }

    // - Called when the component has been mounted
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }

    // - Render the component view
    render() {
        return (
            <BootstrapTable
                data={ this.state.examens }
                search={true}
                pagination={ true }
                fetchInfo={ { dataTotalSize: this.props.totalDataSize } }
                options={ {
                    onAddRow: this.props.onAddRow,
                    sizePerPage: this.props.sizePerPage,
                    onPageChange: this.props.onPageChange,
                    sizePerPageList: [ 5, 10 ],
                    page: this.props.currentPage,
                    onSizePerPageList: this.props.onSizePerPageList } }
            >
                <TableHeaderColumn dataField='id' hidden={ true } dataSort isKey autoValue>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Nom</TableHeaderColumn>
                <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
                <TableHeaderColumn dataField='date'>Date</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

module.exports = ListExamens;
