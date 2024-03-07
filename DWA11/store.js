export const createStore = (reducer) => {
  let state = undefined;
  let subscribers = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach((subscriber) => subscriber());
  };

  const subscribe = (subscriber) => {
    subscribers.push(subscriber);
    return () => {
      subscribers = subscribers.filter((l) => l !== subscriber);
    };
  };

  dispatch({}); // Initialize the state

  return { getState, dispatch, subscribe };
};

/**  The code you've provided defines a subscribe function that takes a subscriber as a parameter. 
Inside the subscribe function, the subscriber is added to an array called subscribers. The function then returns another 
function that removes the subscriber from the subscribers array when called.

Here's a breakdown of the code:

const subscribe = (subscriber) => { }: This line defines a function called subscribe that takes a subscriber as a parameter.

subscribers.push(subscriber);: This line adds the subscriber to the subscribers array.

return () => { subscribers = subscribers.filter((l) => l !== subscriber); };: This line returns an anonymous function 
that filters the subscribers array to remove the subscriber when called.

The subscribe function essentially allows you to add subscribers to a list and also provides a way to "unsubscribe" or 
remove a subscriber from the list by calling the function it returns. This pattern is commonly used in event handling 
and pub/sub systems to manage subscriptions and their removal.
*/
