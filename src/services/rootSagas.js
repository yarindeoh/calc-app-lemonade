import { fork, all } from 'redux-saga/effects';

import { watchChat } from 'containers/Chat/chatSagas';

//TODO:: check is there is another saga
export default function* rootSaga() {
    yield all([fork(watchChat)]);
}
