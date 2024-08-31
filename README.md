# 3813ICTAssignment Chat System
# Overview

This project is a comprehensive text and video chat platform enabling real-time communication among users across various groups and channels. It is developed using the MEAN stack (MongoDB, Express, Angular, Node.js), with Socket.io for real-time messaging and Peer.js for video streaming capabilities.

# Key Features
The chat system supports three distinct user roles:
- Super Admin
- Group Admin
- User

# Groups
Groups are clusters of chat users with permissions managed by either a Group Admin or Super Admin.
Users can belong to multiple groups simultaneously.
Multiple administrators can manage a single group.
Group Admins may oversee more than one group.
Super Admins have the authority to promote users to Group Admins and have comprehensive access to all groups.
Channels
Channels serve as subgroups within a group, designed for focused discussions.
Users who are members of a group can freely join any channel within that group.
# Users
Users are uniquely identified by their username, email, assigned roles, and associated groups.
Users can opt to join or leave groups and participate in channels within their groups.
Account deletion and logout functionalities are available for users.
# User Roles and Responsibilities
## Super Administrator
- Empowered to promote users to the roles of Group Admin or Super Admin.
- Capable of removing users and performing all actions available to Group Admins.
- Has unrestricted access to all groups and channels.
## Group Administrator
- Responsible for creating and managing groups and channels.
- Authorized to remove users from the groups they manage.
- Can ban users from channels and report issues to Super Admins.
## Chat User
- Can create a new chat user account.
- Eligible to join groups and channels.
- Can express interest in groups and leave groups when desired.
# Authentication and Security
The initial setup includes a default Super Admin account with the username super and password 123.
Users must authenticate using a valid username and password.
Upon successful authentication, users gain access to functionalities based on their roles.
# Data Management
In the initial phase, browser-based local storage is utilized for managing data structures.
In the subsequent phase, MongoDB will be implemented to provide persistent storage solutions.
# Documentation
## Repository Structure and Workflow
- Branching Model: The project employs a feature-based branching strategy, where each new feature or bug fix is developed in a separate branch.
- Commit Policy: Regular commits are made to the repository to document progress and maintain a comprehensive history of changes.
- Directory Structure:
- server/: Hosts the Node.js backend, including Express routes, Socket handlers, and Peer.js integration.
- client/: Contains the Angular frontend, comprising components, services, and models.
## Data Models
- User: { username: string, email: string, id: string, roles: string[], groups: string[] }
- Group: { id: string, name: string, adminIds: string[], channelIds: string[] }
- Channel: { id: string, groupId: string, name: string, userIds: string[] }
## Angular Application Structure
- Components: LoginComponent, GroupComponent, ChannelComponent, ChatComponent, AdminDashboardComponent
- Services: AuthService, GroupService, ChannelService, ChatService
- Models: User, Group, Channel
## Routes:
- /login: Displays the login interface.
- /groups: Shows the groups associated with the logged-in user.
- /channels/:groupId: Displays channels within a specific group.
- /chat/:channelId: Presents the chat interface for a selected channel.
- /admin: Provides the admin dashboard for Super Admins and Group Admins.
## Backend Architecture
- Modules: auth.js, groups.js, channels.js, chat.js, admin.js
- Core Functions: login, register, createGroup, deleteGroup, createChannel, deleteChannel, sendMessage, promoteUser
## Files:
- server.js: The main entry point for the Node.js application.
- routes/: Contains route handlers for various functionalities.
- models/: Houses Mongoose models (applicable in the second phase).
- Global Variables: io (Socket.io instance), peerServer (Peer.js server instance)
API Endpoints
- POST /login: Authenticates a user and returns a token.
- POST /register: Registers a new user account.
- GET /groups: Fetches the groups associated with the authenticated user.
- POST /groups: Creates a new group (Group Admin only).
- DELETE /groups/: Deletes an existing group (Group Admin only).
- POST /channels: Creates a new channel within a group (Group Admin only).
- DELETE /channels/: Deletes a specific channel within a group (Group Admin only).
- POST /messages: Sends a message to a designated channel.
- POST /promote: Elevates a user to the Group Admin role (Super Admin only).
# Client-Server Communication
- Login Process: The user submits login credentials via AuthService; the server validates and returns a token. The Angular application stores the token and displays the user’s groups.
- Group Management: Admins use GroupService to create or delete groups. The server updates the backend, and the Angular frontend refreshes the group list accordingly.
- Channel Management: Admins manage channels within a group using ChannelService. The server processes updates, and the Angular frontend reflects changes in the channel list.
- Chat Functionality: Messages are handled through ChatService using Socket.io. The server broadcasts messages to all users in the channel, and the Angular application updates the chat display in real-time.
# Getting Started
## Requirements:
- Node.js
- Angular CLI
- MongoDB (Which will be initialiseed and phased in Assignment Part 2 deployment)
# Installation Instructions
- Clone the repository: git clone https://github.com/yourusername/chatsystem.git
- Navigate to the project directories:
- cd server: To set up the backend.
- cd client: To set up the frontend.
## Install dependencies for both server and client:
- Run npm install in both directories.
- Start the backend server:
- Execute npm start from the server directory.
## Start the frontend client:
- Run ng serve in the client directory.
- Access the application at http://localhost:4200.







