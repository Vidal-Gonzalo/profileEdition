# Vue Challenge
***
For this challenge i made a multi-lingual app in wich the user will be able to register, login, see their data and edit the information. 

## Strategy
***
The structure's app it's quite simple: a Login page where the user sends his e-mail and password to the mocked server where the validation is made. A Signup page where the user can register his own data (First and last name, e-mail, password and profile picture) in our database (in this case i used SessionStorage as a database) and last but not least, a Profile page where the user can see his data and modify it if he wants. 

In the main component (App.js) we can see that i call the Footer component with the objective of get the fetched data and pass it to 'router-view' through props. Then, the components receive the fetched data and spread it to titles, buttons, etc. 

***
The library that i used for the background displays an error of client-width when the size of the screen changes.


## Server
***
I mocked a server with the library "Mock Service Worker" (https://mswjs.io/docs/) where i did the GET and POST requests. I used this strategy to avoid a full backend stack just to serve responses that were meant to be quite static. This also aids on simplicity and lightweight since everything is resolved inside the browser. 


## Project setup
```
npm install
```
***
There are a few vulnerabilities at the time of making the npm install, but it's an issue of Vue CLI. 
(https://github.com/vuejs/vue-cli/issues/6553#issuecomment-898267085) 


### Compiles and hot-reloads for development
```
npm run serve
```

