# Communication System

## Overview
This project is a text and video communication platform that enables users to interact in real-time within various groups and channels. It is developed using the MEAN stack (MongoDB, Express, Angular, Node) alongside Socket.io for real-time messaging and Peer.js for video calls.

## Key Features
The system has three permission levels:
- **Super Admin**
- **Group Admin**
- **User**

### Groups
- Groups consist of chat users with roles assigned by either a Super Admin or Group Admin.
- Users can be part of multiple groups.
- Groups can have multiple administrators.
- Group Admins may oversee more than one group.
- Super Admins can elevate users to Group Admin status and manage all groups.

### Channels
- Channels are sub-sections within groups created for communication purposes.
- Group members can access any channel within the group they belong to.

### Users
- Users are recognized by a unique username, email, and assigned roles within groups.
- They can join or exit groups and engage in channels within those groups.
- Users have the option to delete their accounts or log out.

### Messages
- Messages are exchanged in real-time within channels.
- Each message is stored in the database, including the sender’s username, message content, and timestamp.

## User Roles

- **Super Admin**:
  - Can promote users to Group Admins or other Super Admins.
  - Can remove users and perform all Group Admin functions.
  - Has complete access to all groups and channels.
  
- **Group Admin**:
  - Can create, manage, and remove groups and channels.
  - Can ban users from groups and channels, and report them to Super Admins.
  - Manages the users within their groups.

- **User**:
  - Can create a user account and participate in chats.
  - Can join groups and channels, request to join new groups, or leave groups.

## Authentication
- The initial setup includes a default Super Admin with the username `superAdmin` and password `123`.
- Users authenticate using a username and password.
- Depending on their role, authenticated users gain access to various features.

## Data Storage
- In phase one, data is stored in browser-based local storage.
- MongoDB integration will be added in the second phase for persistent data storage.

## Project Documentation

### Git Repository Organization
- **Branching**: The project follows a feature-branching model where each new feature or bug fix is developed in a separate branch.
- **Commit Frequency**: Frequent commits are made to track progress and maintain change history.

**Project Structure**:
- `server/`: Contains the backend logic, including Express routes, socket event handlers, and Peer.js setup.
- `client/`: Contains the frontend Angular code, including components, services, and models.

### Data Models
**Client-Side Structures**
- **User**: `{ username: string, email: string, id: string, roles: string[], groups: string[], channels: string[] }`
- **Group**: `{ id: string, name: string, adminIds: string[], channelIds: string[] }`
- **Channel**: `{ id: string, groupId: string, name: string, userIds: string[], messages: Message[] }`
- **Message**: `{ username: string, text: string, timestamp: Date }`

**Server-Side Schemas**
- **User Schema**:
    ```javascript
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      roles: { type: [String], required: true },
      groups: { type: [String], required: true },
      channels: { type: [String], required: true }
    });
    ```

- **Group Schema**:
    ```javascript
    const groupSchema = new mongoose.Schema({
      name: { type: String, required: true },
      adminIds: { type: [String], required: true },
      channelIds: { type: [String], required: true }
    });
    ```

- **Channel Schema**:
    ```javascript
    const channelSchema = new mongoose.Schema({
      groupId: { type: String, required: true },
      name: { type: String, required: true },
      userIds: { type: [String], required: true },
      messages: { type: [messageSchema], default: [] }
    });
    ```

- **Message Schema**:
    ```javascript
    const messageSchema = new mongoose.Schema({
      username: { type: String, required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    });
    ```

### Angular Architecture
- **Components**: `LoginComponent`, `GroupComponent`, `ChannelComponent`, `ChatComponent`, `AdminDashboardComponent`
- **Services**: `AuthService`, `GroupService`, `ChannelService`, `ChatService`
- **Models**: `User`, `Group`, `Channel`, `Message`

### Application Routes
- `/login`: Displays the login screen.
- `/groups`: Shows the groups the user belongs to.
- `/channels/:groupId`: Displays the channels within a group.
- `/chat/:channelId`: Opens the chat interface for a specific channel.
- `/admin`: Admin dashboard for Super Admins and Group Admins.

### Node.js Server Architecture
**Modules**:
- `auth.js`
- `groups.js`
- `channels.js`
- `chat.js`
- `admin.js`
- `messages.js`

**Key Functions**:
- `login`
- `register`
- `createGroup`
- `deleteGroup`
- `createChannel`
- `deleteChannel`
- `sendMessage`
- `promoteUser`

**Main Files**:
- `server.js`: The entry point for the Node.js application.
- `routes/`: Contains the route handlers for different functionalities.
- `models/`: Contains Mongoose models (to be implemented in phase two).

**Global Variables**:
- `io`: Socket.io instance for real-time messaging.
- `peerServer`: Peer.js server instance for video chat.

### Server-Side API Routes
- `POST /login`: Authenticates the user and returns a token.
- `POST /register`: Registers a new user.
- `POST /api/channels/join`: Joins a specific channel.
- `GET /api/channels`: Retrieves all channels for a group.
- `DELETE /api/channels/delete/:id`: Deletes a channel.
- `POST /requestJoin`: Requests to join a group.
- `POST /api/groups/approve-request`: Approves a user's group join request.
- `POST /api/groups/remove-from-requests`: Removes a user's request to join a group.
- `GET /api/user/requested-groups`: Gets the groups a user has requested to join.
- `POST /join-group`: Joins a group.
- `POST /joinChannel`: Joins a specific channel.
- `POST /create-group`: Creates a new group.
- `POST /create-channel`: Creates a new channel.
- `GET /groups`: Lists all available groups.
- `DELETE /api/users/deleteAccount/:id`: Deletes a user account.
- `DELETE /api/users/deleteUser/:username`: Deletes a user by username.
- `PATCH /api/users/promote/:id`: Promotes a user to Group Admin or Super Admin.
- `PATCH /api/users/demote/:id`: Demotes a user.
- `GET /api/users`: Retrieves all users.

## Testing

### Front-End Testing with Cypress
For testing the front-end, **Cypress** is used to ensure Angular components and user flows work as expected.

## Cypress Installation and Testing

### Installing Cypress

- Navigate to the `client` directory:
  - `cd client`

- Install Cypress as a development dependency:
  - `npm install cypress --save-dev`

### Running Cypress Tests

- Open the Cypress Test Runner:
  - `npx cypress open`
## Cypress Test Coverage

- **User Authentication**: Tests for registering, logging in, and logging out.
- **Group Management**: Admins can create, delete, and manage groups.
- **Channel Management**: Admins can create, delete, and manage channels within a group.
- **Messaging**: Tests ensure that messages are sent and received in real-time.
- **Join Requests**: Tests for group join requests and admin approvals.

## Back-End Testing with Mocha and Chai

### Installing Mocha and Chai

1. Navigate to the `server` directory:
   - `cd server`

2. Install Mocha and Chai as development dependencies:
   - `npm install mocha chai --save-dev`

### Running Mocha Tests

- Run Mocha tests using the following command:
  - `npx mocha test/**/*.test.js`

## Test Structure

Tests are organized in the `test` directory and cover the following:

- **User Authentication**: Tests for registration, login, and token validation.
- **Group Management**: Tests for creating, retrieving, and deleting groups.
- **Channel Management**: Tests for creating, retrieving, and deleting channels.
- **Message Sending**: Tests for sending and retrieving messages within channels.

## Testing Guidelines

- Each route should have at least two tests: one for successful requests and one for failure scenarios (e.g., unauthorized access).
- Regularly run tests to ensure that new features do not break existing functionality.

# Installation

## Cloning the Repository

- Clone the repository:
  - `git clone <repository-url>`
  - `cd chat-system`

## Install Dependencies

- Navigate to the `client` directory and install dependencies:
  - `cd client`
  - `npm install`

- Navigate to the `server` directory and install dependencies:
  - `cd ../server`
  - `npm install`

# Running the Application

## Running the Server

- To run the server:
  - `node server.js`

## Running the Angular Application

- To run the Angular application:
  - `cd client`
  - `ng serve`

- Access the application at:
  - `http://localhost:4200`

# Contributing

- Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

# License

- This project is licensed under the MIT License. See the LICENSE file for more details.
