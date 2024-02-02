# Amplify Healthcheck with AWS AppSync and Amazon EventBridge

Amplify Healthcheck is an application designed to showcase the integration of AWS AppSync and Amazon EventBridge with a React (Vite) frontend for real-time monitoring and notifications of Amplify Hosting applications' build statuses. This monorepo includes both a React project for the frontend and an AWS Cloud Development Kit (CDK) backend, providing a comprehensive example of how to leverage these AWS services in a modern web application.

## Features

- **Real-Time Build Status Notifications**: Utilizes Amazon EventBridge and AppSync to provide real-time notifications for build statuses including "SUCCEED", "FAILED", or "STARTED".
- **AppSync Integration**: Fetches and displays a list of Amplify Hosting applications on the frontend.
- **AWS CDK Backend**: Uses AWS CDK for infrastructure as code, making deployment and management of AWS resources straightforward.
- **React Frontend**: A sleek and modern frontend built with React and Vite for an optimized developer experience.

## Getting Started

### Prerequisites

- Node.js
- An AWS account
- AWS CLI configured on your machine

### Setup Instructions

1. **Clone the Repository**

   ```
   git clone <repository-url>
   ```

2. **Install Dependencies**

   Install dependencies for both frontend and backend applications:

   - Frontend:

     ```
     npm install
     ```

   - Backend:
     ```
     cd backend
     npm install
     ```

3. **Deploy the Backend**

   From the `backend` directory, deploy the application using AWS CDK:

   ```
   npx aws-cdk deploy
   ```

   _Ensure you have modified any necessary configurations to match your deployment region or preferences._

4. **Run the Frontend Application**

   After deploying the backend, start the frontend application:

   ```
   cd ../frontend
   npm run dev
   ```

   The application should now be accessible in your web browser.

### Note

This project assumes that your Amplify hosted applications are located in `us-east-1`. If your applications are hosted in a different region, please adjust the region references accordingly.

## Contributions

Contributions to this project are welcome! Feel free to submit pull requests or open issues for any improvements or suggestions.
