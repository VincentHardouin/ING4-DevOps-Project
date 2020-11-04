# ING4-DevOps-Projet

Projet de DevOps ING4

## Table Of Contents
1. [Getting Starterd](#getting-started)
2. [Testing](#testing)
3. [Continuous Integration](#continuous-integration)
4. [Continuous Delivery](#continuous-delivery)
5. [Environment](#environment)

## Getting Started 

*1/* Get the sources

```
git clone git@github.com:VincentHardouin/ING4-DevOps-Project.git && cd ING4-DevOps-Project
```

*2/* Execute the configuration script:

```
npm run configure
```

*3/* Launch [Redis](https://redis.io/) database with docker 

```
docker-compose up -d redis
```

*4/* Start the application

```
npm start
```

*5/* Access the application on http://localhost:3000

*6/* Develop and add wonderful features!

## Testing 


### Why ?
### How ?
### What ?

## Continuous Integration
Continuous Integration is precious in development, we need to be trust about our code and new features. 

For the CI, we adopt [GitHub Actions](https://github.com/features/actions) to run our tests.

### Why use GitHub Actions ? 
We chose to use GitHub Actions because for small project they are simple to use and sufficient. 

### What ? 
To use GitHub Actions, you don't need third party services.
Simply, you need to create your workflow.

### How ?
First we used nodejs example in [GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/guides/building-and-testing-nodejs).
To guarantee, same code convention, we have add `eslint` check in CI.
```yaml
- run: npm run lint
```
And in `package.json` : 
```json
"lint": "eslint .",
```

After, when we added Redis in our code and test this. We need to run CI with Redis. For that, we edited the file to add services  : 
```yaml
    services:
      redis:
        image: redis
        ports:
          - 6379:6379
```
Entire workflow is [here](/.github/workflows/node.js.yml).

## Continuous Delivery

### Why ? 
This is important to have user feedback, for that we need to delivery new features as often as possible.

### How ?
Put in production is an important task and redundant, then you should automate it.<br>
For example, there are redundant to fill `CHANGELOG.md` for each version.

### What ? 
To realise that, we used [npm-version](https://docs.npmjs.com/cli/v6/commands/npm-version).


## Environment 

This project is deployed on [Scalingo](https://scalingo.com/) platform. 

### Why use Scalingo ? 
We choosed to use Scalingo as it is french PaaS using [Outscale](https://fr.outscale.com/), a french IaaS. 
Outscale is a subsidiary of Dassault Systèmes.  

Environment | Website
---|--- 
Production | https://ing4ecedevops-production.osc-fr1.scalingo.io
Staging | https://ing4ecedevops-staging.osc-fr1.scalingo.io
Review App | https://ing4ecedevops-staging-pr<Number>.osc-fr1.scalingo.io

### How ?
Scalingo is based on [Heroku](https://www.heroku.com/home). Both detect `package.json` at root of project, 
you can also choose your buildpack if you prefer.

### What ? 
For Production and Staging, we just add an addon for [Redis](https://redis.io/) Database, and provide environment variable : 
`DATABASE_REDIS_URL=` 

For Review Apps, we play it different and add `scalingo.json` file to explain the configuration you want.
In our case we want Redis addon and provide environment variable. It looks like this :
```json
{
  "name": "DevOps Project Review App",
  "env": {
    "DATABASE_REDIS_URL": {
      "description": "",
      "value": "$REDIS_URL"
    }
  },
  "addons": [
    "redis:redis-sandbox"
  ],
  "formation": {
    "web": {
      "amount": 1,
      "size": "S"
    }
  }
}
``` 
 
