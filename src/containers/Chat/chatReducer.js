import {
    // steps,
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
    steps: steps,
};
import { steps } from 'services/messageQueue';

/**
 * Promoting steps array by one or by custom step
 * @param {Object} state redux state
 * @param {Object} action redux action
 */
function promoteStepState(state, action) {
    // Creating a new instance of steps arr when reducing the first element
    let newSteps = state.steps.filter((step, index) => index !== 0);
    let customStep = action?.payload;
    let newCurrentStep = action ? newSteps[0][customStep] : newSteps[0];
    return {
        ...state,
        steps: newSteps,
        currentStep: newCurrentStep,
    };
}

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case AGENT_MESSAGE:
        case USER_MESSAGE:
            return {
                ...state,
                messagesList: [...state.messagesList, action.payload],
            };
        case PROMOTE_CURR_STEP:
            return promoteStepState(state);
        case PROMOTE_TO_STEP:
            return promoteStepState(state, action);
        case TYPING_STATE:
            return {
                ...state,
                isTyping: action.payload,
            };
        default:
            return state;
    }
}
