# [Brute Force](https://brute-force-v2.vercel.app/)
This project is a full-stack gaming blog application developed as part of a university project. The application is built using a robust and modern tech stack including TypeScript, React, Node.js, Express, and Tailwind CSS.

The front-end of the application is built with React and Tailwind CSS, providing a responsive and user-friendly interface. TypeScript is used to ensure type safety and improve the development experience.

The back-end is powered by Node.js and Express, providing a fast and scalable server environment. The server handles requests from the front-end, processes them, and sends back the appropriate responses.

This application serves as a platform for gaming enthusiasts to share and discuss their favorite games, strategies, and gaming news. Users can create, read, update, and delete blog posts, fostering a dynamic and interactive gaming community.

Please refer to the 'Getting Started' section for instructions on how to set up and run the project locally.

Or, you can visit the live demo [here](https://brute-force-v2.vercel.app/).

## Getting Started
To get started, clone this repository and run `npm install` *(on both folders `client` & `server`)* to install the dependencies. Then, run `npm run start:both` to start the server and client *(or you can manually run them in their own folders with `npm run dev`)*. The server will be running on port **`5000`** and the client will be running on port **`3000`**.

## API Documentation
The API documentation can be found [here](https://documenter.getpostman.com/view/18001727/2s9YsT6onc).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Technologies Used

### Client
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)

### Server
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) ![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

### General
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)

## Authors
- [**Fillonit Ibishi**](https://github.com/Fillonit)
- [**Butrint Reçica**](https://github.com/butrinntt)
- [**Erblin Ymeri**](https://github.com/YumaSisyphus)

# Installation
## Clone
Clone this repository to your local machine using 
```shell
$ git clone https://github.com/Fillonit/BruteForceV2
```
## Setup
> Install npm packages
```shell
$ cd client
$ npm install
$ cd ../server
$ npm install
```
> Create a .env file in the server directory and add the following
```shell
NODE_ENV=
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_URL=
SECRET=
APP_OWNER_ID=
PORT=
```

> Run the server
```shell
$ cd server
$ npm start
```
> Run the server with nodemon (preferred)
```shell
$ cd server
$ npm run dev
```
> Run the tests
```shell
$ cd server
$ npm test
```

> Run the client
```shell
$ cd client
$ npm start
```
> Run the client with vite (preferred)
```shell
$ cd client
$ npm run dev
```
> Run the tests
```shell
$ cd client
$ npm test
```

# Thank you for reading!
🌟 *Don't forget to leave a star if you like the project!* 🌟