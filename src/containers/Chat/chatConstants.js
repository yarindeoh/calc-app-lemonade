export const NAMESPACE = 'chat';
export const AGENT = 'AGENT';
export const USER = 'USER';
export const AGENT_MESSAGE = `${NAMESPACE}/AGENT_MESSAGE`;
export const USER_MESSAGE = `${NAMESPACE}/USER_MESSAGE`;
export const POST_MESSAGE = 'POST_MESSAGE';
export const USER_POST_MESSAGE = `${NAMESPACE}/${USER}_${POST_MESSAGE}`;
export const PROMOTE_CURR_STEP = `${NAMESPACE}/PROMOTE_CURR_STEP`;
export const PROMOTE_TO_STEP = `${NAMESPACE}/PROMOTE_TO_CURR_STEP`;
export const CHAT_INITIALIZATION = `${NAMESPACE}/CHAT_INITIALIZATION`;
export const TYPING_STATE = `${NAMESPACE}/TYPING_STATE`;

export const postAgentMessageAction = (payload) => ({
    type: AGENT_MESSAGE,
    payload,
});

export const postUserMessageAction = (payload) => ({
    type: USER_MESSAGE,
    payload,
});

export const postUserMessageFromStepAction = (payload) => ({
    type: USER_POST_MESSAGE,
    payload,
});

export const chatInitializationAction = () => ({
    type: CHAT_INITIALIZATION,
});

export const promoteStepAction = () => ({
    type: PROMOTE_CURR_STEP,
});

export const promoteToStepAction = (payload) => ({
    type: PROMOTE_TO_STEP,
    payload,
});

export const typingAction = (payload) => ({
    type: TYPING_STATE,
    payload,
});

export const MESSAGE_TYPE = {
    message: 'MESSAGE',
    request: 'REQUEST',
};
