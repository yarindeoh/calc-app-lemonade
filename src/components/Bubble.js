import React, { memo, lazy, Suspense } from 'react';

export const Bubble = memo(
    ({ type, message, id, showAvatar, componentPath }) => {
        // In the future, change to absolute path and
        // support passed component props and proper loader
        const CustomComponent = lazy(() =>
            import(`src/components/${componentPath}`)
        );
        return (
            <div className={`${type}`}>
                {showAvatar && <div className={`bubble-avatar-${type}`}></div>}
                <div
                    className={`bubble ${type}-message`}
                    key={`${type}-message-${id}`}
                >
                    <Suspense fallback={<div>Loading</div>}>
                        {componentPath ? <CustomComponent /> : message}
                    </Suspense>
                </div>
            </div>
        );
    }
);
