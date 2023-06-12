# NBA Gateway

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)

> Node Server to interface with Expo App

## Install

```sh
yarn
```

## Usage

### Have Doppler Installed to use Environment Variables

[Getting Started with Doppler](https://docs.doppler.com/docs/getting-started)
[How to Install Doppler](https://docs.doppler.com/docs/install-cli)

You need access to the prospectsportsinc workspace in order to access env vars

```sh
doppler login
```

Make sure config is set to "dev" in doppler.yaml before running:

```sh
doppler setup
```

### Have Docker installed to run the postgres db and supertokens instance

[Docker Install Page](https://www.docker.com)
[SuperTokens](https://supertokens.com)

Using Brew:

```sh
brew install docker

```

In a seperate shell run:

```sh
yarn db:start
```

You can change your ports for both the postgres instance
and the supertokens instance by changing the environment
variables "DB_PORT" and "SUPER_TOKENS_PORT" respectively.

Create a new branch configuration:

```sh
doppler configs clone --name "dev_{your name}" && 
doppler setup -p gateway_server -c "dev_{your name}"
```

Change Port:

```sh
doppler secrets set DB_PORT=60662
doppler secrets set SUPER_TOKENS_PORT=60663
```

Be sure to remove the gateway-server containers and volumes on docker desktop
before running:

```sh
yarn db:start
```

### Run Migrations and Seed Database

In a seperate shell/terminal, run:

```sh
yarn db:migrate
```

This will bootstrap the database with all tables and fields
defined in the /prisma/schema.prisma file and run any migrations
in prisma/migrations

Then run:

```sh
yarn db:seed
```

This will seed the database with fake data for development purposes.
We won't use this in production of course.

## Start the server

Run:

```sh
yarn start
```

or

```sh
yarn dev
```

## tRPC Panel

Visit [http://localhost:5500/panel](http://localhost:5500/panel)
to view how the api works. In order to use it, you will need to generate
an access token on the client. Then you want to select headers at the top right
and add a header. The key should be "Authorization" and the value should be
"Bearer ACCESS_TOKEN"

## Auth Dashboard

Use this command to create a new Admin User for the panel:

```sh
curl --location --request POST 'http://localhost:3567/recipe/dashboard/user' \
--header 'rid: dashboard' \
--header 'Content-Type: application/json' \
--data-raw '{"email": "<YOUR_EMAIL>","password": "<YOUR_PASSWORD>"}'
```

Be sure to substitute your email and password in the above command.

Visit [http://localhost:5500/auth/dashboard](http://localhost:5500/auth/dashboard)
and sign in using your credentials

## Ports

A Note on ports...

Bear in mind for the above commands that if you have changed the ports for
the server or the supertokens instance, you will need to update the urls above
to use those ports.

Default Server Port: 5500
Default Supertokens Port: 3567
Default DB Port: 5432

## Author

👤 **Prospect**

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
