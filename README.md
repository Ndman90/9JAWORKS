# 9JAWORKS

The  9JAWORKS is a LinkedIn-style social networking platform, specifically tailored for job search in Nigeria. It connects employers, job seekers, freelancers, and skill hunters in a secure and structured environment, facilitating professional networking and business connections. 
It facilitates local talent discovery, professional interactions, and job matching, providing a unified space for career and business growth within the Nigerian market.

# Purpose: 
To accelerate job creation, reduce unemployment, and empower businesses to find the right talents locally.

This repository contains the source code, schemas, endpoints, and frontend components required to deploy, scale, and operate the platform.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [User Authentication](#user-authentication)
  - [Connection Management](#connection-management)
  - [Notifications](#notifications)
  - [Email Notifications with Mailtrap](#email-notifications-with-mailtrap)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Management**: User registration, login, and profile management.
- **Connection Requests**: Sending, accepting, and rejecting connection requests, with detailed statuses such as pending, connected, or received.
- **Notifications**: In-app notifications for various actions, including accepted or rejected requests.
- **Email Notifications with Mailtrap**: Email alerts for key actions (e.g., accepted connections) sent via Mailtrap.
- **Optimized UI Components**: User-friendly interface, interactive buttons, and connection status indicators for seamless interaction.

## Tech Stack

- **Frontend**: React, React Router, react-query, HTML and Tailwind CSS.
- **Backend**: Node.js, Express, and MongoDB.
- **Database**: MongoDB with Mongoose for schema and model management.
- **Email Service**: Mailtrap for email notifications during connection activities.
- **Other Tools**: Axios for API handling, Lucide-react for icons, and React Hot Toast for notifications.

## Installation

To get started with the Connection Platform locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ndman90/9JAWORKS.git
   cd 9JAWORKS
Install dependencies:

bash
Copy code
npm install

Setup MongoDB: Ensure MongoDB is installed and running locally or set up your MongoDB Atlas URI.

Configure Mailtrap: Use Mailtrap to handle outbound emails. Sign up at Mailtrap and get your SMTP credentials.

Create .env File: Set up your environment variables for both server and client:

plaintext
Copy code
# .env


# Client
CLIENT_URL=http://localhost:5000
Run the application:

Start the server:
bash
Copy code
npm start
Start the client:
bash
Copy code
cd client
npm start
Configuration
Configure axiosInstance in lib/axios.js to direct to the appropriate API endpoints. Update environment variables as needed.

Usage
The platform provides several user-friendly features:

User Authentication
Supports user registration, login, JWT-based authentication, and route protection.

Connection Management
Users can send, accept, or reject connection requests. The connection status (e.g., pending, connected) is displayed via interactive buttons.

Notifications
Users receive real-time in-app notifications for each connection action.

Email Notifications with Mailtrap
When a connection request is accepted, the sender receives an email notification. The platform uses Mailtrap's SMTP configuration to safely handle outbound emails. Configure the Mailtrap credentials in your .env file.

API Endpoints
Authentication Routes
POST /api/auth/register: Registers a new user.
POST /api/auth/login: Logs in an existing user.
Connection Routes
POST /connections/request/:userId: Sends a connection request to another user.
PUT /connections/accept/:requestId: Accepts a pending connection request.
PUT /connections/reject/:requestId: Rejects a pending connection request.
GET /connections/status/:userId: Retrieves the connection status with a specific user.
Notification Routes
GET /notifications: Retrieves the notifications for the logged-in user.
Error Handling
The backend uses structured error handling, sending standardized JSON responses with status codes for various error types (e.g., 400 for bad requests, 404 for not found).

Testing
Unit tests and integration tests are provided using Jest and React Testing Library for both server and client components.

Contributing
We welcome contributions! Please open an issue or submit a pull request for improvements, bug fixes, or new features.

License
This project is licensed under the MIT License.