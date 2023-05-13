# Tourism Project using MERN Stack with Pug Template Engine

This is a `tourism` `project` built with the MERN stack, which includes `MongoDB, Express, React, and Node.js`. The project uses `Pug` as the template engine for the frontend. The project aims to `provide` a `platform` for travelers to find and `book tours`, as well as for tour operators to showcase and manage their tours.


![](https://img.freepik.com/free-vector/desktop-smartphone-app-development_23-2148683810.jpg?size=626&ext=jpg)
**`Note`**:

This project is still under development and forntend stuff will be done in the future using `React` . At present I am using the templating engine `pug` for the frontend .

## Getting Started

To get started with this project, you will need to have Node.js and MongoDB installed on your machine. You can download and install Node.js from the official website: [Node-js](https://nodejs.org.) .MongoDB can be downloaded and installed from the official website:[mongoDB](https://www.mongodb.com/try/download/community.)

Once you have installed Node.js and MongoDB, you can clone this repository by running the following command in your terminal:

```bash
git clone https://github.com/username/repository.git
```

Next, navigate to the project directory and install the required packages by running the following command:

```bash
npm install
```

create a .env file in the root directory of the project and add the following environment variables:

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/tourism
DATABASE_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_FROM=your_email_from
```

# Running the Project

To run the project in development mode, run the following command in the project directory:

```bash
npm run start:dev
```

This will start the devlopment mode at http://localhost:3000.

To run the project in production mode, run the following command in the project directory:

```bash

npm run start:prod
```

This will start the proudction mode http://localhost:3000.
