# Conversation Component

The Conversation component is a chat application that allows users to send and receive messages in real-time. It uses the Context API to manage state and retrieve data from the backend server.

## Props

The Conversation component does not take any props.

## Context

The following are the context properties used by the Conversation component:

- `user_id`: holds the ID of the current user.
- `connection_id`: holds the ID of the current user's connection.
- `text`: holds the message input text.
- `scrollRef`: a reference to the chat scroll.
- `setText`: a function to set the message input text.
- `messageList`: an array that holds all the messages in the chat.
- `setMessageList`: a function to set the message list.
- `friends`: an array that holds information about all the user's friends.
- `setFriends`: a function to set the friends list.
- `online`: an array that holds information about all the user's online friends.
- `setOnline`: a function to set the online friends list.
- `friendId`: holds the ID of the current active chat friend.
- `setFriendId`: a function to set the active chat friend ID.
- `sendMessage`: a function to send a message to the current active chat friend.

## States

The Conversation component uses the following states:

- `myImg`: holds the URL of the current user's profile image.
- `setMyImg`: a function to set the `myImg` state.
- `friendImg`: holds the URL of the current active chat friend's profile image.
- `setFriendImg`: a function to set the `friendImg` state.

## Functions

The Conversation component uses the following functions:

- `getImages()`: retrieves data from the backend server and returns the necessary information to display on the chat box, including the URLs of the current user's profile image and the active chat friend's profile image.
- `socket.connect()`: connects to the chat server.
- `sendMessage()`: called when the user submits a message. It saves the message to the database and displays it in the chat.
- `getMessageList()`: retrieves the past messages from the backend server.
- `getFriends()`: retrieves the user's friends from the backend server.

## Sub-Components

The Conversation component uses the following sub-components:

### ChatBox

The ChatBox component is responsible for displaying the chat messages and the message input box. It uses the following properties from the context:

- `myImg`
- `friendImg`
- `user_id`
- `connection_id`
- `messageList`
- `scrollRef`

### Online

The Online component displays the list of online friends. It uses the following property from the context:

- `online`

### Message

The Message component displays an individual chat message. It uses the following properties:

- `message`
- `own`
- `img`

---
**<h3 align="center">_Mousa Ibrahim_</h3>**
