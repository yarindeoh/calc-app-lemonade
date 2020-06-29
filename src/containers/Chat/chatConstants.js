import { evaluate } from 'mathjs';

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

export const MESSAGE_TYPE = {
    message: 'MESSAGE',
    request: 'REQUEST',
};

//TODO:: move to external config file
export let steps = ['INIT', ['WELCOME_BACK', 'WELCOME'], 'QA'];
export let MESSAGES_QUEUE = {
    WELCOME: [
        {
            content:
                'Hi, I’m Maya! Today you’re going to help me to ace my game.',
            type: MESSAGE_TYPE.message,
            sender: AGENT,
        },
        {
            content: 'Let’s start by telling me your name',
            type: MESSAGE_TYPE.request,
            sender: AGENT,
        },
        {
            content: (username) => {
                let firstName = username.split(' ')[0];
                sessionStorage.setItem('username', firstName);
                return `Nice to meet you ${firstName}`;
            },
            type: MESSAGE_TYPE.message,
            sender: AGENT,
        },
    ],
    WELCOME_BACK: [
        {
            content: () => {
                let username = sessionStorage.getItem('username');
                return `Nice to see you again ${username}. Let's pick this up from where we left off `;
            },
            type: MESSAGE_TYPE.message,
            sender: AGENT,
        },
    ],
    QA: [
        {
            content:
                'Alright, this is how it’s going to work. List any mathematical expression you can think of - I’ll crunch it in no time',
            type: MESSAGE_TYPE.request,
            sender: AGENT,
        },
        {
            // In the future handle application validation
            // coming from mathjs
            content: (exp) => {
                try {
                    return evaluate(exp);
                } catch (err) {
                    return err;
                }
            },
            type: MESSAGE_TYPE.message,
            sender: AGENT,
            endless: true,
        },
        {
            content: 'This was easy, give me something harder',
            type: MESSAGE_TYPE.request,
            sender: AGENT,
            endless: true,
        },
    ],
};

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
