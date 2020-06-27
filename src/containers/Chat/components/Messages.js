import React, { memo } from 'react';
import { Bubble } from 'components/Bubble';

import agentAvatar from 'resources/images/agent_avatar.png';
import userAvatar from 'resources/images/user_avatar.png';

export const Messages = memo(({ messagesList }) => {
    return (
        <div className="messages">
            {messagesList.map((item, index) => {
                //TODO:: add avatar only in the last messages
                let type = item.sender.toLowerCase();
                return (
                    <Bubble
                        type={type}
                        message={item.content}
                        id={index}
                        key={index}
                        avatarPath={type === 'user' ? userAvatar : agentAvatar}
                    />
                );
            })}
        </div>
    );
});
