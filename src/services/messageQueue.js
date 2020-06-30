import { evaluate } from 'mathjs';

import { MESSAGE_TYPE, AGENT } from 'containers/Chat/chatConstants';

export let steps = ['INIT', ['WELCOME_BACK', 'WELCOME'], 'QA'];
export let messageQueue = {
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
                    console.log(err);
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
