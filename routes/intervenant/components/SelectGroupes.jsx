import React from 'react'
import Select from 'react-select'
import GroupService from '../../../services/GroupService.js'

class SelectGroupes extends React.Component {

    // - Build selector
    constructor(props) {
        super(props);
        this.state = {groups: [], value: "", currentRequest:null};
        this.onChange = this.onChange.bind(this);
        this.getGroups = this.getGroups.bind(this);
    }

    // - when the component has built, get groups
    componentDidMount(){
        this.getGroups();
    }

    // - Unmount request to server when component has not had time to build
    componentWillUnmount() {
        if(this.state.currentRequest != null) {
            this.state.currentRequest.abort();
        }
    }

    // - When the user change value, send request to server from services
    onChange(value) {
        localStorage.setItem("sgroup", JSON.stringify(value));
        this.setState({ value: value });

        if(this.props.callback){
            this.props.callback(value);
        }
    }

    // - Get groups from server
    getGroups() {
        let that = this;
        var req = GroupService.getAll( (result) => {
            let previousSelectedGroup = JSON.parse(localStorage.getItem("sgroup"));
            if(previousSelectedGroup && that.props.callback != null) {
                that.props.callback(previousSelectedGroup);
            }

            that.setState({
                groups: result["groups"],
                value: previousSelectedGroup
            })
        });
        this.setState({currentRequest: req});
    }

    // - Render selecter view for groups
    render() {
        return (
            <div className="form-group col-md-3 col-xs-12 col-lg-3 pull-right" style={{fontSize: '14px'}}>
                <Select
                    value={this.state.value}
                    onChange={this.onChange}
                    valueKey="id"
                    clearable={false}
                    labelKey="name"
                    options={this.state.groups}
                />
            </div>
        )
    }
}

export default SelectGroupes;
