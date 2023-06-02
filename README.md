# NBA Gateway

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)

> Node Server to interface with Expo App

## Install

```sh
yarn
```

## Usage

### Have Docker installed to run a postgres db

[Docker Install Page](https://www.docker.com)

Using Brew:

```sh
brew install docker

```

In a seperate shell run:

```sh
docker compose up

```

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

Start the server:

```sh
yarn start
```

## Author

👤 **Prospect**

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
