# BudgetApp

### Description

Welcome to my BudgetApp!

This is one of my MERN stack projects that i will use to make my portfolio website

The main concept of this app is to help people to manage their finance by allow them to make budgets and add expenses to it

#### Backend technologies:
- NodeJS.
- ExpressJS.
- Authentication (Using JWT, bcrypt, HttpOnly Cookie).
- Middlewares.
  - Auth middleware (To protect the routes).
  - Error handler middlewares (Not found, general error handler).
- RESTfull API.
- MVC Design pattern.
- Database MongoDb used wirf ODM mongoose.
#### FrontEnd technologies:
- React + React Router Dom
- State Management (Redux with Redux-toolkit + React-redux)
- Authentication (Using Protected routes)
- Material UI (CSS framework)
- React toastify


## Pages:

#### 1. Login/Register Pages:

I put those in the first because all the application is protected so no one can access another one's budgets. Each one contains a form which help the user to login or to create a new user, each one uses validation on the server side to the email, username, password, confirm password to ensure security.

#### 2. Home Page:

Its the landing page which shows a budget form to help the user create new ones and expense form (show when their is at least one budget) and all the Budgets that the user has been created also there is an expense table that shows all the expenses created in order with pagination limited to 5 expenses (and can change it).

#### 3.Budget Page:

Its a contains all the budget information with expense form and expenses table which shows only the budget expenses, in this page the user is allowed to delete the budget or any expense realted to it (which is not avaliable in the home screen).

#### 4.Edit budget Page:

Its a contains a form that allows the user to change the budget name and amount.

#### How the website works?

The idea is simple. The user can register or login (If the user already has an account). During registration you need to enter these fields:

- Name (It can be anything between 3-30 characters).
- Email (Email can only registered one time & should be a valid Email & can not be empty).
- Password: must be at least 6 symbols long conatins letters (Uppercase and lowercase), numbers,and it is hashed after checks are done.

- Confirm password: must be equal to the password field.

After the registration process, the website will direct the user to the home page, then the user can create a budgets and expenses.

#### Routing

There are two types of routes, unprotected routes (register & login), and protected routes (all the pages related to the budgets, the user can not view them if he is not logged in), this routing system is on both the backend and the frontend.

#### Authentication

The website uses json web token with httpOnly cookie to confirm that user is verified user or not. Once the user registered or logged in, his credentials are checked with bcrypt and generate a token with JWT library and assigned to the httpOnly cookie. With this token the user can use the website and with every request the token get verified to check if it from a valid user or not.

#### Database

Database stores all the users and budgets, every budget has a user (which hold the user id) to connect it to its user, also the expense has a user and budget fields (which hold the user id and budget id). in this website i used NoSql database which is MongoDB with ODM.

