import {PureComponent} from 'react';
import SecurityService from "../../services/api/SecurityService";
import {Auth} from "../../services/Auth";
import {withRouter} from 'react-router-dom';

class Logout extends PureComponent {

    componentDidMount() {
        const {history} = this.props;

        SecurityService.logout();
        Auth.signout(() => {
            history.push('/')
        })
    }

    render() {
        return null
    }
}

export default withRouter(Logout);