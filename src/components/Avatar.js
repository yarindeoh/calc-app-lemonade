import React, { memo } from 'react';

export const Avatar = memo(({ imgPath }) => {
    return <img src={imgPath} />;
});
