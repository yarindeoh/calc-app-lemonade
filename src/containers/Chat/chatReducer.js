import {
    steps,
    PROMOTE_CURR_STEP,
    AGENT_MESSAGE,
    USER_MESSAGE,
    PROMOTE_TO_STEP,
    TYPING_STATE,
} from 'containers/Chat/chatConstants';

const initialState = {
    currentStep: steps[0],
    messagesList: [],
    isTyping: false,
};

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case AGENT_MESSAGE:
        case USER_MESSAGE:
            return {
                ...state,
                messagesList: [...state.messagesList, action.payload],
            };
        //TODO:: refactor currentStep change from state
        case PROMOTE_CURR_STEP:
            return {
                ...state,
                currentStep: [...steps.splice(0, 1)] && steps[0],
            };
        case PROMOTE_TO_STEP:
            return {
                ...state,
                currentStep:
                    [...steps.splice(0, 1)] && steps[0][action.payload],
            };
        case TYPING_STATE:
            return {
                ...state,
                isTyping: action.payload,
            };
        default:
            return state;
    }
}
