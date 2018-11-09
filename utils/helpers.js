import { AsyncStorage } from 'react-native';

const DATA_STORAGE_KEY = 'flashcardsDataStorage:key';

export function getDecks () {
  return AsyncStorage.getItem(DATA_STORAGE_KEY)
    .then(res => setInitialData(res));
};

export function getDeck () {

};

export function saveDeckTitle (title) {
  AsyncStorage.getItem(DATA_STORAGE_KEY)
    .then(res => {
      const data = JSON.parse(res);
      const updatedData = {
        ...data,
        [title] : {
          title,
          questions: []
        }
      };

      AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(updatedData));
    });
};

export function addCardToDeck () {

};

function setInitialData (results) {
  if (results === null) {
    AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  } else {
    return JSON.parse(results);
  }
};

const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Node: {
    title: 'Node',
    questions: [
      {
        question: 'What is Chaining in Node.js?',
        answer: 'Chaining is a mechanism whereby the output of one stream is connected to another stream creating a chain of multiple stream operations.'
      }
    ]
  }
};