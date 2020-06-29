import React, { memo } from 'react';

export const Bubble = memo(({ type, message, id, showAvatar }) => {
    return (
        <div className={`${type}`}>
            {showAvatar && <div className={`bubble-avatar-${type}`}></div>}
            <div
                className={`bubble ${type}-message`}
                key={`${type}-message-${id}`}
            >
                {message}
            </div>
        </div>
    );
});
