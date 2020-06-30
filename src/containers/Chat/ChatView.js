import React from 'react';

import {
    useAgentInit,
    useMessagesList,
    useUserMessage
} from 'containers/Chat/chatHooks';
import { Messages } from './components/Messages';

const ChatView = () => {
    useAgentInit();
    const messagesList = useMessagesList();
    const { postUserMessage, setUserMessage, userMessage } = useUserMessage();
    return (
        <div className="chat">
            <Messages messagesList={messagesList} />
            <div className="chat-input">
                <input
                    type="text"
                    value={userMessage}
                    onChange={event => setUserMessage(event.target.value)}
                />
                <button
                    onClick={() => postUserMessage(userMessage)}
                    className="submit-icon"
                ></button>
            </div>
        </div>
    );
};

export default ChatView;
