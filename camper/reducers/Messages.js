import {MESSAGES_LIST, MESSAGE_CRUD_MODAL, MESSAGE_CRUD_EDIT, MESSAGES_LIST_UPDATE, MESSAGES_LIST_ADD} from '../actions/ActionTypes'


const initialData = {
    list: null,
    messageCrud: {
        id: null,
        date_from: null,
        date_to: null,
        content: '',
        is_active: true,
    },
    showMessageCrud: false
};

const Messages = (state = initialData, action) => {
    switch (action.type) {
        case MESSAGES_LIST:
            return {
                ...state,
                list: action.list
            };
        case MESSAGE_CRUD_MODAL:
            let crud =  initialData.messageCrud;

            if (Object.keys(action.message).length) {
                crud = action.message
            }

            return {
                ...state,
                messageCrud: crud,
                showMessageCrud: action.message === true || Object.keys(action.message).length > 0,
            };

        case MESSAGES_LIST_ADD:
            return {
                ...state,
                list: [
                    ...state.list,
                    action.row
                ]
            };

        case MESSAGES_LIST_UPDATE:
            let list = state.list
                .filter(row => row.id !== action.row.id)
            list.push(action.row);

            return {
                ...state,
                list
            };

        case MESSAGE_CRUD_EDIT:
            return {
                ...state,
                messageCrud: {
                    ...state.messageCrud,
                    [action.key]: action.value
                }
            };
        default:
            return state
    }
};

export default Messages