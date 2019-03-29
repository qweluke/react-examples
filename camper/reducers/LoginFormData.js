import {LOGIN_FORM_DATA} from '../actions/ActionTypes'

const initialData = {
    cognito_sub: null,
    session: null,
    formType: 'login'
};

const LoginFormData = (state = initialData, action) => {
    switch (action.type) {
        case LOGIN_FORM_DATA:
            return {
                ...state,
                ...action.data
            };

        default:
            return state
    }
};

export default LoginFormData