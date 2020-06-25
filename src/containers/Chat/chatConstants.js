//TODO:: handle messages better
export const STEPS = ['init', 'name', 'QA'];
export const AGENT_MESSAGES = {
    NAME: [
        'Hi, I’m Maya! Today you’re going to help me to ace my game.',
        'Let’s start by telling me your name',
    ],
    QA: [
        'Alright, this is how it’s going to work',
        'List any mathematical expression you can think of - I’ll crunch it in no time',
    ],
};

export const CHANGE_STEP = 'CHANGE_STEP';
export const AGENT_MESSAGE = 'AGENT_MESSAGE';
export const USER_MESSAGE = 'USER_MESSAGE';
export const POST_MESSAGE = 'POST_MESSAGE';
export const CHANGE_CURR_STEP = 'CHANGE_CURR_STEP';
export const NAME_STEP = 'NAME_STEP';
export const QA_STEP = 'QA_STEP';

export const changeForStepAction = (payload) => ({
    type: `${CHANGE_STEP}_${payload}`,
    payload,
});

export const changeCurrStepAction = (payload) => ({
    type: CHANGE_CURR_STEP,
    payload,
});

//Change all add step first
export const postAgentMessageAction = (payload) => ({
    type: AGENT_MESSAGE,
    payload,
});

export const postUserMessageAction = (payload) => ({
    type: USER_MESSAGE,
    payload,
});

export const postUserMessageFromStep = (payload) => ({
    type: `${payload.currentStep}_STEP/USER_${POST_MESSAGE}`,
    payload,
});
