# TelegramBot

## Setting up database

Install Postgres - using brew(if you are on a mac)

### Create the database and roles

```
createdb telegram_bot
createuser telegram_bot_user

psql telegram_bot

GRANT ALL PRIVILEGES ON DATABASE telegram_bot to telegram_bot_user

```

## Setting up the App

Pull the latest code from the repository

### Install packages

```
npm install
```

### Bootstrap the database

```
npm run bootstrap
```

### Run the app

```
npm start
```

PS: 
For the time being I have added the database local db credentials to .env.local. 
When running the app these configuration values should be moved to .env


