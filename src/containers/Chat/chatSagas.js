import { put, takeLatest, delay, all } from 'redux-saga/effects';

import {
    CHANGE_STEP,
    changeCurrStepAction,
    postAgentMessageAction,
    AGENT_MESSAGES,
} from 'containers/Chat/chatConstants';

export function* nameStepHandler(action) {
    let step = action.payload;
    yield put(changeCurrStepAction(step));
    for (let message in AGENT_MESSAGES[step]) {
        yield delay(1000);
        yield put(
            postAgentMessageAction({
                type: 'AGENT',
                message: AGENT_MESSAGES[step][message],
                // id: messageCount + 1,
            })
        );
    }
}

//TODO:: convert message to const
export function* handler(action) {
    let { username } = action.payload;
    yield delay(1000);
    yield put(
        postAgentMessageAction({
            type: 'AGENT',
            message: `Nice to meet you ${username}`,
        })
    );
    //dispatch promoteStep
}

export function* watchChat() {
    yield takeLatest(`${CHANGE_STEP}_NAME`, nameStepHandler);
    yield takeLatest(`NAME_STEP/USER_POST_MESSAGE`, handler);
}
