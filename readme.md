# Final GoLogoLo (CSE 316 -Fundamentals of Software Development)

A logo maker with a full-stack MERN application complete with a back-end and database


### Requirements

This project reqires MongoDB, which can be obtained from https://www.mongodb.com/download-center/community
In addition, make sure that MongoDB has been added to the Path of system Environmental Variables
Make sure nothing is running in port 3000 and 3001.Port 3000 is required for GraphiQL(http://localhost:3000/graphql.)

### Setup

After cloning the project from github, remove the content from the db folder.

For the first time running first run in your terminal where the path is directory is located.

```
mongod --dbpath="db"
```

Create a new terminal

```
cd server
npm install
npm install -g nodemon
nodemon
```

Create a new terminal

```
cd client
npm install
npm start
```

Running the code after the first set up

Create a new terminal

```
cd server
mongod
nodemon
```

Create a new terminal

```
cd client
npm start
```
