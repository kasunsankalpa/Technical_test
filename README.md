
# Technical test
wire apps technical task



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PRIVATEKEY_ACCESSTOCKEN=supper-secret`


## run following commands

To Install dependencies

```bash
  npm Install
```

To start project

```bash
  npm run start:dev
```
project run on http://localhost:3000

## Features

- user signUp
- user signin
- create / update / softdelete medication
- create / update / softdelete customer
- role base authentication


## Note

The project is built on the NestJS framework, employing SQLite database and NestJS TypeORM for data handling. It implements role-based authentication with three roles: OWNER, CASHIER, and MANAGER. Validated DTOs are utilized to ensure the accuracy of user inputs

