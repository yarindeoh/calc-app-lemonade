import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import {
    changeForStepAction,
    postUserMessageAction,
    postUserMessageFromStep,
} from 'containers/Chat/chatConstants';
import { getMessagesList, getCurrentStep } from 'containers/Chat/chatSelectors';

export const useAgentInit = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeForStepAction('NAME'));
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
                dispatch(
                    postUserMessageAction({
                        type: 'USER',
                        message: userMessage,
                    })
                );
                console.log(currentStep);
                dispatch(
                    postUserMessageFromStep({
                        username: userMessage,
                        currentStep,
                    })
                );
            },
            [currentStep]
        ),
        userMessage,
        setUserMessage,
    };
};
