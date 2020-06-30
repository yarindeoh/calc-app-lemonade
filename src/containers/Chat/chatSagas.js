import { put, takeLatest, delay, call, select } from 'redux-saga/effects';
import {
    PROMOTE_CURR_STEP,
    postAgentMessageAction,
    promoteStepAction,
    promoteToStepAction,
    typingAction,
    CHAT_INITIALIZATION,
    USER_POST_MESSAGE,
} from 'containers/Chat/chatConstants';
import { getCurrentStep } from 'containers/Chat/chatSelectors';
import { messageQueue } from 'services/messageQueue';

/**
 * A naive and linear decision of next step base on sessionStorage prop
 * decistion tree is arr of arr/text
 * if not -> promote to welcome step
 * if yes -> promote to welcome back step
 */
export function* chatInitHandler() {
    const username = sessionStorage.getItem('username');
    yield put(promoteToStepAction(!username ? 1 : 0));
    yield call(agentPostMessagesHandler);
}

/**
 * 
 * @param {String} step
 */
export function* handleEndOfQueue(step) {
    if (messageQueue[step].length === 0) {
        yield put(promoteStepAction());
    }
}

/**
 * Send agent messages
 */
export function* agentPostMessagesHandler() {
    let currentStep = yield select(getCurrentStep);
    yield call(messageHandler, { currentStep });
}

export function* userPostMessageHandler(action) {
    let { currentStep, userInput } = action.payload;
    yield call(messageHandler, { currentStep, userInput });
}

export function* messageHandler({ currentStep, userInput }) {
    console.log(messageQueue);
    yield call(postAgentMessages, {
        messages: messageQueue[currentStep],
        userInput,
    });
    yield call(handleEndOfQueue, currentStep);
}

export function popFromMessageQueue({ messages, indexsToBeRemoved }) {
    while (indexsToBeRemoved.length) {
        messages.splice(indexsToBeRemoved.pop(), 1);
    }
}

/**
 *
 * @param {*} queue Array of objects of messasges { text: String, type: MESSAGE/REQUEST }
 * @param {*} sender AGENT/USER
 */
export function* postAgentMessages({ messages, userInput }) {
    let indexsToBeRemoved = [];
    for (let key in messages) {
        let message = messages[key];
        yield put(typingAction(true));
        yield delay(1000);
        yield put(
            postAgentMessageAction({
                sender: message.sender,
                content:
                    typeof message.content === 'function'
                        ? message.content(userInput)
                        : message.content,
                type: message.type,
            })
        );
        yield put(typingAction(false));
        if (message.type === 'REQUEST') {
            !message?.endless && indexsToBeRemoved.push(key);
            break;
        }
        !message?.endless && indexsToBeRemoved.push(key);
    }
    yield call(popFromMessageQueue, {
        messages,
        indexsToBeRemoved,
    });
}

export function* watchChat() {
    yield takeLatest(CHAT_INITIALIZATION, chatInitHandler);
    yield takeLatest(PROMOTE_CURR_STEP, agentPostMessagesHandler);
    yield takeLatest(USER_POST_MESSAGE, userPostMessageHandler);
}
