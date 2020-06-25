import React from 'react';

import {
    useAgentInit,
    useMessagesList,
    useUserMessage,
} from 'containers/Chat/chatHooks';

const ChatView = () => {
    useAgentInit();
    const { messagesList } = useMessagesList();
    const { postUserMessage, setUserMessage, userMessage } = useUserMessage();
    return (
        <div className="app">
            <div className="chat"></div>
            <div className="messages">
                {/* AddID */}
                {messagesList.map((item, index) => (
                    <div
                        className={`${item.type.toLowerCase()}-message`}
                        key={`${item.type.toLowerCase()}-message-${index}`}
                    >
                        {item.message}
                    </div>
                ))}
            </div>
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
