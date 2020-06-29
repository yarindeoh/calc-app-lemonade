import { fork } from 'redux-saga/effects';

import { watchChat } from 'containers/Chat/chatSagas';

export default function* rootSaga() {
    yield fork(watchChat);
}
