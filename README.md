# Gateway Server

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)

> Express Server to interface with Expo App

## Install

```sh
yarn
```

## Usage

### Have Doppler Installed to use Environment Variables

- [Getting Started with Doppler](https://docs.doppler.com/docs/getting-started)
- [How to Install Doppler](https://docs.doppler.com/docs/install-cli)

Using Brew:

```sh
# Prerequisite. gnupg is required for binary signature verification
brew install gnupg

# Next, install using brew (use `doppler update` for subsequent updates)
brew install dopplerhq/cli/doppler
```

Then run:

```sh
yarn env
```

To setup environment variables

### Have Docker Desktop installed to run the postgres db and supertokens instance

[Docker Install Page](https://www.docker.com)
[SuperTokens](https://supertokens.com)

Using Brew:

```sh
brew install homebrew/cask/docker
brew install docker-compose
```

Make sure docker desktop is running, then run:

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

Default Server Port: 5500
Default Supertokens Port: 3567
Default DB Port: 5432

## Prisma Studio

Run the following to launch a GUI for the database:

```sh
yarn db:studio
```

## Author

👤 **steve-rodri <24379257+steve-rodri@users.noreply.github.com>**

- Github: [@steve-rodri](https://github.com/steve-rodri)
- LinkedIn: [@steve-rodri](https://linkedin.com/in/steve-rodri)

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
