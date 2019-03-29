import * as actionTypes from './ActionTypes'



/** campsite */

export const showCampsiteCreateUserModal = campsite => {
    return {
        type: actionTypes.CAMPSITE_CREATE_USER_MODAL,
        campsite
    };
}

export const setCampsiteList = list => {
    return {
        type: actionTypes.CAMPSITE_LIST,
        list
    };
}

export const setCampsiteFeaturesList = list => {
    return {
        type: actionTypes.CAMPSITE_FEATURES_LIST,
        list
    };
}

export const setCampsiteObjectTypes = objectTypes => {
    return {
        type: actionTypes.CAMPSITE_OBJECT_TYPES,
        objectTypes
    };
}

export const addCampsiteToCampsiteList = campsite => {
    return {
        type: actionTypes.CAMPSITE_LIST_ADD,
        campsite
    };
}

export const showCampsiteCreateAccountModal = show => {
    return {
        type: actionTypes.CAMPSITE_CREATE_ACCOUNT_MODAL,
        show
    };
}

/** settings */
export const showCampsitePropertyCrud = property => {
    return {
        type: actionTypes.SETTINGS_PROPERTY_CRUD,
        property
    };
}

export const setSettingsData = (object, data) => {
    return {
        type: actionTypes.SETTINGS_DATA,
        object, data
    };
}


/** messages */

export const setMessagesList = list => {
    return {
        type: actionTypes.MESSAGES_LIST,
        list
    };
}


export const messageListUpdate = row => {
    return {
        type: actionTypes.MESSAGES_LIST_UPDATE,
        row
    };
}

export const messageListAdd = row => {
    return {
        type: actionTypes.MESSAGES_LIST_ADD,
        row
    };
}

export const showMessagePropertyCrud = message => {
    return {
        type: actionTypes.MESSAGE_CRUD_MODAL,
        message
    };
}

export const editMessageCrudField = (key, value) => {
    return {
        type: actionTypes.MESSAGE_CRUD_EDIT,
        key, value
    };
}


/** booking */

export const showBookingModalCrud = reservation => {
    return {
        type: actionTypes.BOOKING_CRUD_MODAL,
        reservation
    };
}