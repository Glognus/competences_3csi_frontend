import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import UserEvaluations from './WidgetComponents/UserEvaluations.jsx'
import AttributionEvaluations from './WidgetComponents/AttributionEvaluations.jsx'
import ListCompetences from '../Competences/ListCompetences.jsx'
import UserService from '../../../services/UserService.js'
import EvaluationAutoService from '../../../services/EvaluationAutoService.js'
import EvaluationIntervenantService from '../../../services/EvaluationIntervenantService.js'
import EvaluationExamenService from '../../../services/EvaluationExamenService.js'
import Auth from '../../auth/Auth.jsx'

class WidgetEvaluations extends React.Component {

    // - Build evaluations widget which build evaluations
    constructor(props) {
        super(props);
        this.state = {
            group: null,
            users_selected: [],
            competences_selected: [],
            evaluation_rows: [],
            screenHeight: "100px"
        };

        this.onUserSelect = this.onUserSelect.bind(this);
        this.onUserSelectAll = this.onUserSelectAll.bind(this);
        this.onCompetenceSelect = this.onCompetenceSelect.bind(this);
        this.onCompetenceSelectAll = this.onCompetenceSelectAll.bind(this);
        this.onExamenSelect = this.onExamenSelect.bind(this);
        this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
    }

    // when compoent will receive props, bind data
    componentWillReceiveProps(nextProps) {
        this.setState({
            group: nextProps.group,
            isIntervenant: nextProps.isIntervenant
        });

        if (!nextProps.isIntervenant) {
            var userID = Auth.getUserInfo().user_id;
            this.state.users_selected = [userID];
        }
    }

    // update evalations from services
    updateEvaluationRows() {
        let users_selected = this.state.users_selected;
        let competences_selected = this.state.competences_selected;

        // -
        if (users_selected.length <= 0 || competences_selected.length <= 0)
            return;

        let that = this;
        switch (this.props.mode) {
            case "evaluations_libres":
                if (this.props.isIntervenant) {
                    UserService.getUserListCompetenceEvaluation(users_selected, competences_selected, (result) => {
                        that.setState({
                            evaluation_rows: result
                        });
                    });
                } else {
                    UserService.getUserListCompetenceEvaluationAuto(users_selected, competences_selected, (result) => {
                        that.setState({
                            evaluation_rows: result
                        });
                    });
                }
                break;
            default:
                // -
                if (this.state.examen_id == null)
                    return;

                UserService.getUserListCompetenceEvaluationByExamen(this.state.examen_id, users_selected, competences_selected, (result) => {
                    that.setState({
                        evaluation_rows: result
                    });
                });
                break;
        }
    }

    // - check mode "evaluations libres" or "evaluations examens" and save data from services
    onAfterSaveCell(row, cellName, cellValue) {
        var that = this;
        switch (this.props.mode) {
            case "evaluations_libres":
                if (this.props.isIntervenant) {
                    EvaluationIntervenantService.post(row, (result) => {
                        console.log(result);
                    });
                } else {
                    EvaluationAutoService.post(row, (result) => {
                        console.log(result);
                    });
                }
                break;
            default:
                row.examen_id = that.state.examen_id;
                EvaluationExamenService.post(row, (result) => {
                    console.log(result);
                });
                break;
        }
    }

    // - Custom options for users table
    getUserSelectRowProp() {
        return {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onUserSelect,
            onSelectAll: this.onUserSelectAll
        };
    }

    // - When compoent has mounted, try to get last examen
    componentDidMount() {
        this.setState({examen_id: 1});

        // Patch allowing to resize multiple react-bootstrap-table instances in tabs
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            let panels = $('div[role="tabpanel"]');
            var minHeight = Infinity;
            var panel;
            for (var i = 0; i < panels.length; i++) {
                panel = $(panels[i]);

                var container = panel.find('div[class="react-bs-container-body"]');
                minHeight = Math.min(minHeight, $(container).height());
            }
            $('div[class="react-bs-container-body"]').css('height', minHeight);
        });
    }

    // - Save users selected
    onUserSelect(row, isSelected) {
        let users_selected = this.state.users_selected;
        if (isSelected) {
            users_selected.push(row.id);
        }
        else {
            let unselected = users_selected.indexOf(row.id);
            if (unselected != -1) {
                users_selected.splice(unselected, 1);
            }
        }

        this.setState({
            users_selected: users_selected
        });
        this.updateEvaluationRows();
    }

    // Save all users
    onUserSelectAll(isSelected, currentDisplayAndSelectedData) {
        let users_selected = this.state.users_selected;
        if (isSelected) {
            for (let i = 0; i < currentDisplayAndSelectedData.length; i++) {
                users_selected.push(currentDisplayAndSelectedData[i].id);
            }
        }
        else {
            users_selected = [];
        }

        this.setState({
            users_selected: users_selected
        });
        this.updateEvaluationRows()
    }

    // gustom option for compoentences table
    getCompetenceSelectRowProp() {
        return {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onCompetenceSelect,
            onSelectAll: this.onCompetenceSelectAll
        };
    }

    // get specified value
    onCompetenceSelect(row, isSelected) {
        let competences_selected = this.state.competences_selected;
        if (isSelected) {
            competences_selected.push(row.id);
        }
        else {
            let unselected = competences_selected.indexOf(row.id);
            if (unselected != -1) {
                competences_selected.splice(unselected, 1);
            }
        }

        this.setState({
            competences_selected: competences_selected
        });
        this.updateEvaluationRows();
    }

    // - get all selected values
    onCompetenceSelectAll(isSelected, currentDisplayAndSelectedData) {
        let competences_selected = this.state.competences_selected;
        if (isSelected) {
            for (let i = 0; i < currentDisplayAndSelectedData.length; i++) {
                competences_selected.push(currentDisplayAndSelectedData[i].id);
            }
        }
        else {
            competences_selected = [];
        }

        this.setState({
            competences_selected: competences_selected
        });
        this.updateEvaluationRows();
    }

    // - when examen has been selected, bind data
    onExamenSelect(value) {
        this.setState({
            examen_id: value
        });
    }

    // - render widget evaluations
    render() {
        return (
            <div className="nav-tabs-custom" style={{height: 100 + '%'}}>
                <ul id="myTabs" className="nav nav-tabs" role="tablist">
                    {this.props.isIntervenant
                        ?
                        <li className="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Selection des
                            utilisateurs</a></li>
                        :
                        null
                    }
                    <li className={this.props.isIntervenant ? "" : "active"}>
                        <a href="#tab_2" data-toggle="tab" aria-expanded="false">Selection des compétences</a>
                    </li>
                    <li><a href="#tab_3" data-toggle="tab">Attribution des compétences</a></li>
                </ul>
                <div className="tab-content" style={{padding: 0}}>
                    {this.props.isIntervenant
                        ?
                        <div role="tabpanel" className="tab-pane active" id="tab_1">
                            <div className="box-body col-xs-12 table-container">
                                <UserEvaluations
                                    selectRowProp={this.getUserSelectRowProp()}
                                    group={this.state.group}
                                    mode={this.props.mode}
                                />
                            </div>
                            <div className="box-footer">
                                <button onClick={function(){
                                        $('#myTabs a[href="#tab_2"]').tab('show')
                                    }} className="btn btn-primary pull-right">Suivant
                                </button>
                            </div>
                        </div>
                        :
                        null
                    }
                    <div role="tabpanel" className={this.props.isIntervenant ? "tab-pane" : "tab-pane active" }
                         id="tab_2">
                        <div className="box-body col-xs-12 table-container">
                            <ListCompetences
                                selectRowProp={this.getCompetenceSelectRowProp()}
                                group={this.state.group}
                                mode={this.props.mode}
                                examenCallback={this.onExamenSelect}
                                isIntervenant={this.state.isIntervenant}
                            />
                        </div>
                        <div className="box-footer">
                            <button onClick={function(){
                                        $('#myTabs a[href="#tab_1"]').tab('show')
                                    }} className="btn btn-default pull-left">Précédent
                            </button>
                            <button onClick={function(){
                                        $('#myTabs a[href="#tab_3"]').tab('show')
                                    }} className="btn btn-primary pull-right">Suivant
                            </button>
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="tab_3">
                        <AttributionEvaluations
                            evaluations={this.state.evaluation_rows}
                            mode={this.props.mode}
                            editCallback={this.onAfterSaveCell}
                            isIntervenant={this.state.isIntervenant}
                        />
                        <div className="box-footer">
                            <button onClick={function(){
                                        $('#myTabs a[href="#tab_2"]').tab('show')
                                    }} className="btn btn-default pull-left">Précédent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WidgetEvaluations
