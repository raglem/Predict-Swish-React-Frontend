# Predict & Swish Frontend

This repository contains the frontend implementation for the Predict & Swish web application. The frontend provides a UI to view and make predictions for upcoming games, forms to create and manage a league, and a sidebar to chat with other users as well as interact with other features provided by the API routes of the [Predict & Swish backend](https://github.com/raglem/Predict-Swish-Express-Backend).

**Use the following credentials (username: "test_user", password: "mypassword") to test the deployed full-stack web app and interact with bots (e.g., remove from friend list, make predictions, create a league). [Access the web app here](https://predict-swish-react-frontend.vercel.app/).**

## Introduction

- The Predict & Swish web application is a live NBA prediction web app.
- Users can:
    - View upcoming games and make predictions on the final score.
    - Track and evaluate the accuracy of their predictions.
    - Friend and form leagues with other users.
- Leagues:
    - Tally users' predictions and display the status of others' predictions.
    - Allow users to compete for the top spot in league leaderboards based on prediction accuracy.
    - Include a chat feature for discussing upcoming games with other league members.
    - Can be formed in two modes:
        - **Classic Mode**: Tallies predictions for all NBA games.
        - **Team Mode**: Tracks predictions for games of a specified team.

## Features

- Interactive UI for making predictions on NBA games
- Dynamic forms for creating and managing leagues
- Real-time chat functionality within leagues
    - Note: Vercel's serverless architecture does not support long-lived WebSocket connections. Therefore, the chat feature is dysfunctional on the test deployment. To view the chat feature, you can watch this demo video run on a local computer.
- Integration with backend API for data retrieval and updates
- User authentication and session management using JWT
- Responsive design for seamless use across devices

## Technologies Used

- **Programming Language**: JavaScript
- **Framework**: React, Chakra UI


## Key Components and Pages

### Components

- **GameCard**: Displays information about an upcoming NBA game, including teams, team logos, date, and prediction status of other league members.
- **LeagueCard**: Highlights league details such as name, mode, and leaderboard standings. Displays recent and upcoming NBA games that are tallied in the league.
- **Chat**: Provides real-time chat functionality for league members for each specific upcoming game.
- **PredictCard**: Allows users to submit and view their score predictions for upcoming games.

### Pages

- **Home Page**: Displays friends and leagues of user. Displays a list of upcoming NBA games and allows users to make predictions.
- **Games Page**: Presents upcoming and recent games (e.g. teams, team logos, date). Sidebar chat for a user to discuss specific games with other members in a league the user is in.
- **Leagues Page**: Shows specific details (e.g. name, mode, etc.) of all leagues owned by the user and all leagues user is currently a member of. Includes upcoming and recent games being tallied by the league as well as a leaderboard summing the prediction points of all users.
- **Create/Update League Pages**: Provides a form for users to create a new league in either Classic or Team mode as an owner. The owner can invite other users to join the league, accept users requesting membership in the league, and manage/remove users currently in the league. 
- **Login/Signup Page**: Handles user authentication and account creation.

