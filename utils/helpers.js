import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import Results from '../Components/Results';

const DATA_STORAGE_KEY = 'flashcardsDataStorage:key';
const NOTIFICATIONS_KEY = 'flashcardsNotifications:key';

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

export function addCardToDeck (title, card) {
  AsyncStorage.getItem(DATA_STORAGE_KEY)
    .then(res => {
      const data = JSON.parse(res);
      const updatedData = {
        ...data,
        [title] : {
          title: title,
          questions: [
            ...data[title].questions,
            card
          ]
        }
      };

      AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(updatedData));
    });
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

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
};

function createNotification () {
  return {
    title: 'Get your smart on!',
    body: 'Test your skills with some questions today!',
    ios: {
      sound: true,

    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
};

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(11);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              );

              AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
            }
          });
      };
    });
};

export const navTabRoutes = (Home, NewDeck) => {
  return { 
    Main: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons
              name="library-books"
              color={tintColor}
              size={24}
          />
      )
  }
},
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons
              name="plus-box"
              color={tintColor}
              size={24}
          />
      )
  }
}};
};

export const navTabOptions = {
	tabBarOptions: {
    activeTintColor: '#F8F8F8',
    inactiveTintColor: '#586589',
    style: {
        backgroundColor: '#171F33'
    }
  }
};

export const stackNavRoutes = (Home, Deck, Quiz, Results, NewQuestion ) => ({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
  },
  Quiz: {
    screen: Quiz
  },
  Results: {
    screen: Results,
    navigationOptions: {
      header: null
    }
  },
  Question: {
    screen: NewQuestion,
    navigationOptions: {
      title: 'New Question'
    }
  }
});

export const stackNavOptions = {
  navigationOptions: {
    headerTintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor: "#171F33"
    }
  }
};