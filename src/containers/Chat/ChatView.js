import React from 'react';

import {
    useAgentInit,
    useMessagesList,
    useUserMessage,
} from 'containers/Chat/chatHooks';
import { Messages } from './components/Messages';

const ChatView = () => {
    useAgentInit();
    const { messagesList } = useMessagesList();
    const { postUserMessage, setUserMessage, userMessage } = useUserMessage();
    return (
        <div className="app">
            <div className="chat"></div>
            <Messages messagesList={messagesList} />
            <div className="chat-footer">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(event) => setUserMessage(event.target.value)}
                />
                <button onClick={() => postUserMessage(userMessage)}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ChatView;
