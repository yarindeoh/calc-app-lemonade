// Consider using memoizing selectors using reselect in the future

export const getMessagesList = state => state.chat.messagesList;
export const getCurrentStep = state => state.chat.currentStep;
export const getTypingState = state => state.chat.isTyping;
