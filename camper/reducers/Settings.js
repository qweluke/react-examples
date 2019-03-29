import {SETTINGS_PROPERTY_CRUD, SETTINGS_DATA} from '../actions/ActionTypes'

const initialData = {
    editedProperty: null,
    general: {
        campsite_id: null,
        properties: []
    }
};

const Settings = (state = initialData, action) => {
    switch (action.type) {
        case SETTINGS_PROPERTY_CRUD:
            return {
                ...state,
                editedProperty: action.property
            };
        case SETTINGS_DATA:
            return {
                ...state,
                [action.object]: action.data
            }
        default:
            return state
    }
};

export default Settings