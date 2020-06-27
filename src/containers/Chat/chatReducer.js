import {
    STEPS,
    PROMOTE_CURR_STEP,
    AGENT_MESSAGE,
    USER_MESSAGE,
    PROMOTE_TO_STEP,
} from 'containers/Chat/chatConstants';

const initialState = {
    currentStep: STEPS[0],
    messagesList: [],
};

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case AGENT_MESSAGE:
        case USER_MESSAGE:
            return {
                ...state,
                messagesList: [...state.messagesList, action.payload],
            };
        case PROMOTE_CURR_STEP:
            return {
                ...state,
                currentStep: STEPS.splice(0, 1) && STEPS[0],
            };
        case PROMOTE_TO_STEP:
            return {
                ...state,
                currentStep: STEPS.splice(0, 1) && STEPS[0][action.payload],
            };
        default:
            return state;
    }
}
