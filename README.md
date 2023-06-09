# NBA Gateway

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)

> Node Server to interface with Expo App

## Install

```sh
yarn
```

## Usage

### Have Doppler Installed to use Environment Variables

[Doppler Docs](https://docs.doppler.com/docs)

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
doppler secrets set DB_PORT=15432
doppler secrets set SUPER_TOKENS_PORT=15432
```

Be sure to remove the gateway-server containers and volumes on docker desktop
before running:

```sh
yarn db:start
```

In a seperate shell, start the server:

```sh
yarn start
```

## Author

👤 **Prospect**

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
