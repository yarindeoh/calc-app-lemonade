import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';

import { chatReducer } from 'containers/Chat/chatReducer';

const createRootReducer = () =>
    combineReducers({
        i18n: i18nReducer,
        chat: chatReducer,
    });
export default createRootReducer;
