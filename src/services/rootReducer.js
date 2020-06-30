import { combineReducers } from 'redux';

import { chatReducer } from 'containers/Chat/chatReducer';

const createRootReducer = () =>
    combineReducers({
        chat: chatReducer
    });
export default createRootReducer;
