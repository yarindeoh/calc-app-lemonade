import { put, takeLatest, delay, call, select, take } from 'redux-saga/effects';
import {
    watchChat,
    postAgentMessages,
    popFromMessageQueue,
    userPostMessageHandler,
    agentPostMessagesHandler,
    handleEndOfQueue,
    chatInitHandler,
} from 'containers/Chat/chatSagas';
import { getCurrentStep } from 'containers/Chat/chatSelectors';

import {
    MESSAGES_QUEUE,
    CHAT_INITIALIZATION,
    PROMOTE_CURR_STEP,
    USER_POST_MESSAGE,
    promoteToStepAction,
    steps,
} from 'containers/Chat/chatConstants';

describe('Chat sagas test', function() {
    it('Watch main chat sagas', () => {
        const gen = watchChat();
        expect(gen.next().value).toEqual(
            takeLatest(CHAT_INITIALIZATION, chatInitHandler)
        );
        expect(gen.next().value).toEqual(
            takeLatest(PROMOTE_CURR_STEP, agentPostMessagesHandler)
        );
        expect(gen.next().value).toEqual(
            takeLatest(USER_POST_MESSAGE, userPostMessageHandler)
        );
        expect(gen.next().done).toEqual(true);
    });
    it('Chat initialize when username exist', function() {
        let username = 'username';
        const gen = chatInitHandler();
        expect(gen.next().value).toEqual(
            put(promoteToStepAction(Number(!!username)))
        );
        expect(gen.next().value).toEqual(call(agentPostMessagesHandler));
        expect(gen.next().done).toEqual(true);
    });
    it('Agent post message', () => {
        const gen = agentPostMessagesHandler();
        let currentStep = steps[2];
        let messages = MESSAGES_QUEUE[currentStep];
        expect(gen.next(currentStep).value).toEqual(select(getCurrentStep));
        expect(gen.next(MESSAGES_QUEUE[2]).value).toEqual(
            call(postAgentMessages, { messages: MESSAGES_QUEUE[2] })
        );
        expect(gen.next(MESSAGES_QUEUE[2]).value).toEqual(
            call(handleEndOfQueue, MESSAGES_QUEUE[2])
        );
        expect(gen.next().done).toEqual(true);
    });
    it('User post message', () => {
        const action = {
            type: USER_POST_MESSAGE,
            payload: {
                currentStep: steps[2],
                userInput: '2+2',
            },
        };
        const gen = userPostMessageHandler(action);
        expect(gen.next().value).toEqual(
            call(postAgentMessages, {
                messages: MESSAGES_QUEUE[action.payload.currentStep],
                userInput: action.payload.userInput,
            })
        );
        expect(gen.next().value).toEqual(
            call(handleEndOfQueue, action.payload.currentStep)
        );
        expect(gen.next().done).toEqual(true);
    });
});
