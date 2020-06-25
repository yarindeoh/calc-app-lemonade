import { STEPS, CHANGE_CURR_STEP } from 'containers/Chat/chatConstants';

const initialState = {
    currentStep: STEPS[0],
    messagesList: [],
    messageCount: 0,
};

//TODO:: add id to every message and it's type
export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_CURR_STEP':
            return {
                ...state,
                currentStep: action.payload,
            };
        case 'AGENT_MESSAGE':
        case 'USER_MESSAGE':
            return {
                ...state,
                messagesList: [...state.messagesList, action.payload],
            };
        default:
            return state;
    }
}
