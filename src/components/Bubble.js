import React, { memo } from 'react';

import { Avatar } from 'components/Avatar';

export const Bubble = memo(({ type, message, id, avatarPath }) => {
    return (
        <div className="bubble">
            {/* <Avatar imgPath={avatarPath} /> */}
            <div className="bubble-avatar"></div>
            <p
                className={`bubble-text ${type}-message`}
                key={`${type}-message-${id}`}
            >
                {message}
            </p>
        </div>
    );
});
