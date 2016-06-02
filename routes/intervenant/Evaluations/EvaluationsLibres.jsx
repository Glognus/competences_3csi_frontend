import React from 'react'
import WidgetEvaluations from './WidgetEvaluations.jsx'
import Select from 'react-select'
import GroupService from '../../../services/GroupService.js'
import SelectGroupes from '../components/SelectGroupes.jsx'

class EvaluationsLibres extends React.Component {

    // - Build component view for "evaluations libres"
    constructor(props) {
        super(props);
        this.state = {
            selected_group: null,
            is_intervenant: localStorage.getItem('us_role') == 'ROLE_INTERVENANT'
        };
        this.handleGroupValueChanged = this.handleGroupValueChanged.bind(this);
    }

    // - When component has mounted check if user is "usager" or "intervenant"
    componentDidMount(){
        $(window).trigger('resize');
        this.setState({isIntervenant: localStorage.getItem('us_role') == 'ROLE_INTERVENANT'});
    }

    // - On change group, bind selected group
    handleGroupValueChanged(value) {
        this.setState({selected_group: value});
    }

    // - Render view for "evaluations libres"
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Evaluations Libres
                        <small>Attribuer des évaluations depuis des competences</small>
                        { this.state.is_intervenant
                            ?
                            <SelectGroupes callback={this.handleGroupValueChanged}/>
                            :
                            null
                        }
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    <div className="row">
                        <div className="col-xs-12">
                            <section >
                                <WidgetEvaluations
                                    mode="evaluations_libres"
                                    group={this.state.selected_group}
                                    isIntervenant={this.state.isIntervenant}
                                    />
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

module.exports = EvaluationsLibres;
