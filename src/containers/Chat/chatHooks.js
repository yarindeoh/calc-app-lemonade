import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import {
    postUserMessageAction,
    postUserMessageFromStepAction,
    chatInitializationAction,
    MESSAGE_TYPE,
    USER,
} from 'containers/Chat/chatConstants';
import { getMessagesList, getCurrentStep } from 'containers/Chat/chatSelectors';

export const useAgentInit = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(chatInitializationAction());
    }, []);
};

export const useMessagesList = () => {
    let messagesList = useSelector(getMessagesList, shallowEqual);
    return {
        messagesList,
    };
};
export const useUserMessage = () => {
    const dispatch = useDispatch();
    const [userMessage, setUserMessage] = useState('');
    let currentStep = useSelector(getCurrentStep, shallowEqual);
    return {
        postUserMessage: useCallback(
            (userMessage) => {
                // Add message to message list in the store
                // for presenting messages in UI and for future transcript
                dispatch(
                    postUserMessageAction({
                        sender: USER,
                        content: userMessage,
                        type: MESSAGE_TYPE.message,
                    })
                );
                // post user message to handle by middleware
                dispatch(
                    postUserMessageFromStepAction({
                        userInput: userMessage,
                        currentStep,
                    })
                );
                setUserMessage('');
            },
            [currentStep]
        ),
        userMessage,
        setUserMessage,
    };
};
