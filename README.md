# challange-api
  The following challenge-api was developed using NODE with typescript, and contains a login / signup process for users who are also authenticated using bcrypt and jwt, those users can modify their data (firtName, lastName, dni, password, email and username), and they can also load N sons, those sons can be logged in and only see their own data and parents can modify the data of their own sons (firstName, lastName and dni). 

## Installing

For the latest stable version:

```bash
npm install
```

## Documentation

  The api contais three basic section, 
  1. Signin , Login and Profile , the profile endpoint will show the user logged info.
  2. CRUD for users, this section can be access only for an admin-role user
  3. CRUD for sons this only can be access once the user is logged and is his role is admin
When a new SON is created this action will also create an new user for that SON ,the role of this new user is "user" the credentials for the user's are his own DNI as it follows:
```
{
  username: dni,
  password: dni
}
```
*  Once started the server you can access the documentation here http://localhost:3000/docs , I choose swagger for the documentation and functional testing of the endpoints 

## Building

In order to build the TypeScript compiler, ensure that you have [Git](https://git-scm.com/downloads) , [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/es) installed.

Clone a copy of the repo:

```bash
git clone https://github.com/ecaracasdev/challange-api.git
```

Change to the challange-api directory:

```bash
cd challange-api
```

Install tools and dev dependencies:

```bash
npm install 
```

Use one of the following to build and test:

```
ts             # Build the compiler into built/local also watching for any change.
dev            # Start the app for development process.
start          # Build the compiler into a product like directory and start the server.
```


## Usage

```bash
npm run start
```
