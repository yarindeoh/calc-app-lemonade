## Calcolator Chat Application

React based application that implements a chatbot flow which allows a user to 
ask Maya agent infinite math questions. 

### Guidlines
- In a real chatbot flow there will be backend that will analyze user responses probably with NLP mechanism. 
  Since it's a frontend task, I've focued on implementing this flow in pure frontend stack including mainly React, Redux, webpack and Jest. 
- I found collisions between the spec and UI and I choosed to follow UI mocks in style structure, messages and flow.


### Technical Flow
Chat flow includes [init,welcome/welcomeBack, QA] steps and each step has constant array of messages.

In order to create a solid and basic infra for scaling steps, promoting steps is done by saga middleware 
where each message received from the user, dequeue the messageQueue according to the current step
(if it's a request type of message, waiting for the user to response). 
Promiting step ahead is done when the messageQueue is empty.

## Quick Use

Run in locally - webpack-dev-server

```
npm start
```

Run tests / test in dev mode (--watch)

```
npm run test
```

Fix eslint issues

```
npm run lint-fix
```

