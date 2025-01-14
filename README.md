# Node.js + React Data Source + Field Mapping Custom UI Example

This project demonstrates how to build a custom UI for Data Source and Field Mapping using Integration.app React components and a Node.js backend.

## Project Structure

```
ContactForm/
├── backend/
│   ├── .env
│   ├── fetchToken.js
│   ├── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── assets/
│   │   ├── ContactCreationForm.css
│   │   ├── ContactCreationForm.js
│   │   ├── index.js
│   ├── package.json
├── .gitignore
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/contact-form.git
    cd ContactForm
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `backend` directory with the following content:

    ```env
    WORKSPACE_KEY=your_workspace_key
    WORKSPACE_SECRET=your_workspace_secret
    ```

4. **Fill in desired user data in fetchToken.js:**   
    const tokenData = {
        id: 'your_user_id',
        name: 'Your Name',
        fields: {
        userField: '<user fields value>'
        }
    } 

## Running the Project

1. **Start the backend and frontend servers concurrently:**

    ```sh
    npm run dev
    ```

This will start the backend server on http://localhost:8080 and the frontend server on http://localhost:3000.

## Project Details

### Backend

The backend is a Node.js server that generates an integration token using JWT. It is located in the backend directory.

- Dependencies: express, jsonwebtoken, dotenv, cors
- Dev Dependencies: nodemon
- Scripts:
    - start: Starts the server using nodemon
    - dev: Starts the server using nodemon

### Frontend

The frontend is a React application that uses the Integration.app React components to create a contact form. It is located in the frontend directory.

- Dependencies: @integration-app/react, axios, react, react-dom, react-scripts, web-vitals
- Dev Dependencies: cors, jsonwebtoken, @babel/plugin-proposal-private-property-in-object, nodemon
- Scripts:
    - start: Starts the React development server
    - build: Builds the React application for production
    - test: Runs the tests
    - eject: Ejects the React application
    - dev: Starts the React development server using nodemon

### Contact Creation Form
The contact creation form is implemented in ContactCreationForm.js. It allows users to fill out a form and create a contact on HubSpot.

### Fetch Token
The token fetching logic is implemented in fetchToken.js. It generates a JWT token using the workspace key and secret.

### License
This project is licensed under the MIT License