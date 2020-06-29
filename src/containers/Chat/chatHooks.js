import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import {
    postUserMessageAction,
    postUserMessageFromStepAction,
    chatInitializationAction,
    MESSAGE_TYPE,
    USER,
} from 'containers/Chat/chatConstants';
import {
    getMessagesList,
    getCurrentStep,
    getTypingState,
} from 'containers/Chat/chatSelectors';

export const useAgentInit = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(chatInitializationAction());
    }, []);
};

export const useMessagesList = () => {
    return useSelector(getMessagesList, shallowEqual);
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
                // Post user message to handle by middleware
                dispatch(
                    postUserMessageFromStepAction({
                        userInput: userMessage,
                        currentStep,
                    })
                );
                // Reset user input
                setUserMessage('');
            },
            [currentStep]
        ),
        userMessage,
        setUserMessage,
    };
};

export const useTypingState = () => {
    return useSelector(getTypingState, shallowEqual);
};

export const useScrollBottomMsgs = () => {
    const messagesEndRef = useRef(null);
    let messages = useMessagesList();
    const scrollToBottom = () => {
        messagesEndRef.current &&
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(scrollToBottom, [messages]);
    return messagesEndRef;
};
