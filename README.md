# Auth App

This application consists of two repositories: a front-end and a back-end. Below are the details of each repository and instructions on how to clone and set them up effectively.

## Repositories

### Front-End Repository
- **Path:** `easy-generator-auth-fe`
- **URL:** `git@github.com:sarah-mosbah/easy-generator-auth-fe.git`
- **Technology:** React.js

### Back-End Repository
- **Path:** `easy-generator-auth-be`
- **URL:** `git@github.com:sarah-mosbah/easy-generator-auth-be.git`
- **Technology:** Nest.js

## Cloning the Repositories

To clone the repositories effectively, follow these steps:

1. Clone the main repository which contains the submodules:
    ```sh
    git clone --recurse-submodules git@github.com:sarah-mosbah/auth-app.git
    ```

2. Navigate to the cloned directory:
    ```sh
    cd auth-app
    ```

3. Initialize and update the submodules:
    ```sh
    git submodule update --init --recursive
    ```

## Setting Up the Front-End (React.js)

1. Navigate to the front-end directory:
    ```sh
    cd easy-generator-auth-fe
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

## Setting Up the Back-End (Nest.js)

1. Navigate to the back-end directory:
    ```sh
    cd easy-generator-auth-be
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run start:dev
    ```

By following these steps, you will have both the front-end and back-end repositories cloned, dependencies installed, and development servers running.