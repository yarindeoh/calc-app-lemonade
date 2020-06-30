import React, { memo } from 'react';

import { Bubble } from 'components/Bubble';
import { MESSAGE_TYPE, USER } from 'containers/Chat/chatConstants';
import { useTypingState, useScrollBottomMsgs } from 'containers/Chat/chatHooks';

export const Messages = memo(({ messagesList }) => {
    const isTyping = useTypingState();
    const messagesEndRef = useScrollBottomMsgs();
    return (
        <div className="messages">
            {messagesList.map((item, index) => {
                let sender = item.sender.toLowerCase();
                return (
                    <Bubble
                        ref={messagesEndRef}
                        type={sender}
                        message={item.content}
                        id={index}
                        key={index}
                        showAvatar={
                            item.type === MESSAGE_TYPE.request ||
                            sender === USER.toLowerCase()
                        }
                    />
                );
            })}
            {isTyping && (
                <Bubble
                    type="agent"
                    componentPath="TypingSpinner"
                    id="typing"
                    showAvatar
                />
            )}
        </div>
    );
});
