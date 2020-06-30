import { put, takeLatest, delay, call, select } from 'redux-saga/effects';
import {
    PROMOTE_CURR_STEP,
    CHAT_INITIALIZATION,
    USER_POST_MESSAGE,
    postAgentMessageAction,
    promoteStepAction,
    promoteToStepAction,
    typingAction,
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
 * Promoting to next step only if messagesQueue is empty
 * @param {String} step
 */
export function* handleEndOfQueue(step) {
    if (messageQueue[step].length === 0) {
        yield put(promoteStepAction());
    }
}

export function* agentPostMessagesHandler() {
    let currentStep = yield select(getCurrentStep);
    yield call(messageHandler, { currentStep });
}

export function* userPostMessageHandler(action) {
    let { currentStep, userInput } = action.payload;
    yield call(messageHandler, { currentStep, userInput });
}

/**
 * Post agent messages from messageQueue according to currentStep
 * and user input if exist.
 * @param {String} currentStep
 * @param {String} userInput
 */
export function* messageHandler({ currentStep, userInput }) {
    yield call(postAgentMessages, {
        messages: messageQueue[currentStep],
        userInput,
    });
    yield call(handleEndOfQueue, currentStep);
}

// Remove required messages from messageQueue
export function popFromMessageQueue({ messages, indexsToBeRemoved }) {
    while (indexsToBeRemoved.length) {
        messages.splice(indexsToBeRemoved.pop(), 1);
    }
}

/**
 * Post agent message after a delay, handle typing state and update messagesQueue.
 * Handle message content type -> string/function.
 * If it's a request break from look in order to wait for user response.
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
