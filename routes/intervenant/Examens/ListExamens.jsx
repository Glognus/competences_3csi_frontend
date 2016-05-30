import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import GroupService from '../../../services/GroupService.js'
import NotificationSystem from 'react-notification-system'
class ListExamens extends React.Component {

    // -
    constructor(props) {
        super(props);
        this.state = {examens: []};
    }

    // -
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
        console.log(nextProps);
        if(nextProps.group){
            this.getExamens(nextProps.group.id);
        }
    }

    // -
    getExamens(groupID) {

        console.log("getExamens");
        var that = this;
        GroupService.getExamens(groupID, function (result) {
            that.setState({
                examens: result
            })
        });
    }

    componentDidMount() {
      this._notificationSystem = this.refs.notificationSystem;
    }

    // -
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
