import React, { memo, lazy, Suspense, forwardRef } from 'react';

export const Bubble = memo(
    forwardRef(({ type, message, id, showAvatar, componentPath }, ref) => {
        // In the future, change to absolute path and
        // support passed component props and proper loader
        const CustomComponent = lazy(() =>
            import(`src/components/${componentPath}`)
        );
        return (
            <div className={`${type}`} ref={ref}>
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
    })
);
