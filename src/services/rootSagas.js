import { fork, all } from 'redux-saga/effects';

import { initTranslationSaga } from 'services/i18n/translationSaga';
import { watchChat } from 'containers/Chat/chatSagas';

export default function* rootSaga() {
    yield all([fork(initTranslationSaga), fork(watchChat)]);
}
