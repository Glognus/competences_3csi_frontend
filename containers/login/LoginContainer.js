import { connect } from 'react-redux'
import { login } from '../../actions/actions'
import Login from '../../components/login/Login.jsx'

const mapStateToProps = (state) => {
    return {
        session: state.session
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (name, password) => {
            dispatch(login(name, password));
        }
    }
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer