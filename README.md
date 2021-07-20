# challange-api
  The following challenge-api was developed using NODE with typescript, and contains a login / signup process for users who are also authenticated using bcrypt and jwt, those users can modify their data (firtName, lastName, dni, password, email and username), and they can also load N sons, those sons can be logged in and only see their own data and parents can modify the data of their own sons (firstName, lastName and dni). 

## Installing

For the latest stable version:

```bash
npm install
```

## Documentation

### Once The API is running, two roles (admin and user) are created and there is one user and two sons in the users and son schema, both of them will be automatically created, the credentials for the admin user are.

```
{
  username: admin,
  password: password
}
```

With the admin user you can start testing the API's sections, for example the endpoint GET /api/sons should show the list of current sons, you can also login with the users's sons credentials (using their dni) as is explained below
 
### The api contais three basic section, 
  1. Signin , Login and Profile , the profile endpoint will show the user logged info.
  2. CRUD for users, this section can be access only for an admin-role user when the user is logged
  3. CRUD for sons this only can be access once the user is logged and is his role is admin
When a new SON is created this action will also create an new user for that SON ,the role of this new user is "user" the credentials for the user's are his own DNI as it follows:
```
{
  username: dni,
  password: dni
}
```
###  The main endpoints are
  1. /api/auth/signup -> User registration
  2. /api/auth/login  -> User or Son login (fill the blanks with dni in case of son's user)
  3. /api/auth/profile -> Info of the current logged user
  4. /api/sons/ -> Son's CRUD detailed in the /docs endpoint
  5. /api/users/ -> Users's CRUD detailed in the /docs endpoint

###  Once started the server you can access the documentation here http://localhost:3000/docs , I choose swagger for the documentation and functional testing of the endpoints 

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
