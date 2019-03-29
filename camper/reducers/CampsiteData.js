import {CAMPSITE_LIST, CAMPSITE_LIST_ADD, CAMPSITE_OBJECT_TYPES, CAMPSITE_FEATURES_LIST} from '../actions/ActionTypes'

const initialData = {
    campsiteList: null,
    objectTypes: [],
    featuresList: []
};

const CampsiteData = (state = initialData, action) => {
    switch (action.type) {
        case CAMPSITE_LIST:
            return {
                ...state,
                campsiteList: action.list,
            };
        case CAMPSITE_LIST_ADD:
            state.list.unshift(action.campsite);
            return {
                ...state
            };

        case CAMPSITE_OBJECT_TYPES:
            return {
                ...state,
                objectTypes: action.objectTypes,
            };
        case CAMPSITE_FEATURES_LIST:
            return {
                ...state,
                featuresList: action.list,
            };

        default:
            return state
    }
};

export default CampsiteData