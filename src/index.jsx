/* eslint-disable no-shadow */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../assets/application.scss';
import store from './app/store';
import App from './components/App.jsx';
import { socket, SocketContext } from './context/socket.jsx';
import UserContext from './context/user.jsx';
import { addMessage } from './slices/messages.js';
import { addChannel, renameChannel, removeChannel } from './slices/channels.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

socket.on('newMessage', (message) => store.dispatch(addMessage(message)));
socket.on('newChannel', (channel) => store.dispatch(addChannel(channel)));
socket.on('renameChannel', (channel) => store.dispatch(renameChannel(channel)));
socket.on('removeChannel', (channel) => store.dispatch(removeChannel(channel)));

const SocketProvider = ({ children }) => {
  const sendMessage = (message) => {
    socket.emit('newMessage', message, (response) => {
      console.log(response.status);
    });
  };

  const addNewChannel = (channel) => {
    socket.emit('newChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  return (
    <SocketContext.Provider value={{
      sendMessage, addNewChannel, renameChannel, removeChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const UserProvider = ({ children }) => {
  const curUserData = JSON.parse(localStorage.getItem('userData'));
  const curUser = curUserData ? { username: curUserData.username } : null;
  const [userData, setUser] = useState(curUser);

  const logIn = ({ username, token }) => {
    localStorage.setItem('userData', JSON.stringify({ username, token }));
    setUser({ username });
    console.log(userData);
  };

  const logOut = () => {
    localStorage.removeItem('userData');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ userData, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <SocketProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SocketProvider>
  </Provider>,
  document.querySelector('#chat'),
);
