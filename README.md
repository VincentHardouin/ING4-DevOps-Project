# ING4-DevOps-Projet

Projet de DevOps ING4

![Index Page](docs/img/index-page.png)

## Table Of Contents
1. [Getting Started](#getting-started)
2. [Code Practice](#code-practice)
3. [Testing](#testing)
4. [Continuous Integration](#continuous-integration)
5. [Continuous Delivery](#continuous-delivery)
6. [Environments](#environments)
6. [Health Check](#health-check)
7. [Authors](#authors)

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

## Code practice 

### Pair Programing

We think that pair programing and mob programing are more efficient than one person programing 
and others review. 

With small delay like this project, it's also quicker and easily with this practice.  
 
### Clean Architecture 

- Controller - Use-case - Repositories
- Dependency injection to facilitate testing 

### Domain Driven Design - DDD

We used [DDD](https://blog.octo.com/domain-driven-design-des-armes-pour-affronter-la-complexite/) to develop 
our application, because we want the code should match the business domain. In our case, it's represented requirements specification.

### 12 Factors 

We used [12 factors](https://12factor.net/) methodology to develop our application.

### Craftmanship 

As possible, in this small app we used [software craftmanship](https://blog.octo.com/software-craftsmanship-une-culture-a-transmettre/) culture for develop our application. 

## Testing 

### Why ?
We are convinced by the importance of testing our app to deliver clean code in production.  

### How ?
We chose [mocha](https://mochajs.org/) and [chai](https://www.chaijs.com/) to test our app.
They are simple to use and have good documentation. 
Also, to stub and mock we selected [sinon](https://sinonjs.org/). 

### What ?
We added `mocha`, `chai`, `sinon` inside `devDepencies` in `package.json`. <br>
To simplify their usage we created `test-helper` which is useful to : 
- Export all required modules : `chai`, `sinon`, `expect`, `request`
- Export currying function `catchErr` to test errors
- Create global `afterEach` to restore stub and empty database 

Moreover, we used multiple types of tests : 
- **Unit Tests** : to test isolated functions, with stub and mock  
- **Integration Tests** : to test interaction between multiple modules, for example repositories function with database connection
- **Acceptance Tests** : to test all integration, for example API endpoint 
- **e2e Tests**: to test features in real environment like user with [Cypress](https://www.cypress.io/). 
- **load Tests**: to test load on our application with [Artillery.io](https://artillery.io)

## Continuous Integration
Continuous Integration is precious in development, we need to be confident about our code and new features. 

For the CI, we adopted [GitHub Actions](https://github.com/features/actions) to run our tests.

### Why use GitHub Actions ? 
We chose to use GitHub Actions. Indeed, when talking about small project they are simple to use and meet all our needs. Plus, GitHub Actions can easily be scalable to match our project evolution. 

### What ? 
GitHub Actions, doesn’t need third party services to be used. 
You simply need to create your workflow.

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

After having added Redis Database in our code and tested it, we need to run CI with Redis. For that, we edited the file to add services  : 
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
This is important to have user feedback, for that we need to deliver new features as often as possible.

### How ?
Release is an important and redundant task, this is why you should automate it.<br>
For example, there are redundant to fill *`CHANGELOG.md`* for each version.

### What ? 
To achieve that, we used [npm-version](https://docs.npmjs.com/cli/v6/commands/npm-version).
On hook *`version`*, script get merged pull request titles from last release and add it in *`CHANGELOG.md`*.
Also, tag using [SemVer](https://semver.org/) is created and pushed to GitHub.

Finally, for deployment, Scalingo triggers master branch changes and deploys it after CI success.
In our `package.json` :
```json
    "release": "npm run release:minor",
    "release:patch": "npm version patch -m \"Release v%s\"",
    "release:minor": "npm version minor -m \"Release v%s\"",
    "release:major": "npm version major -m \"Release v%s\"",
    "preversion": "git checkout dev && git pull --rebase && npm test",
    "version": "node scripts/release/get-pull-requests-to-release-in-prod.js && git add package.json CHANGELOG.md",
    "postversion": "git push && git checkout master && git pull && git fetch -t && git merge dev --no-edit && git push origin master && git push --tags && git checkout dev"
```

## Environments

### IaaS Approach with Kubernetes

### PaaS Approach

This project is deployed on [Scalingo](https://scalingo.com/) platform. 

#### Why use Scalingo ? 
We chose to use Scalingo as it is French PaaS using [Outscale](https://fr.outscale.com/), a French IaaS. 
Outscale is a subsidiary of Dassault Systèmes.  

#### How ?
Scalingo is based on [Heroku](https://www.heroku.com/home). Both detect `package.json` at root of project, 
you can also choose your buildpack if you prefer.

#### What ? 
For Production and Staging, we just add an addon for [Redis](https://redis.io/) Database, and provide environment variable : 
`DATABASE_REDIS_URL=` 

For Review Apps, we play it different and add `scalingo.json` file to explain the configuration we want.
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

![Ing4-DevOps-Project-PaaS-Environment](docs/img/PaaS-environments.png)

|Environment | Website|
|:---:|---| 
|Production | https://ing4ecedevops-production.osc-fr1.scalingo.io|
|Integration | https://ing4ecedevops-staging.osc-fr1.scalingo.io|
|Review App | https://ing4ecedevops-staging-pr<Number>.osc-fr1.scalingo.io|

 
## Health Check

### Why ? 

Create and deploy an application is great but if users can't use it, it's useless. 

### How ? 

To guarantee user access, we need to have a health check dashboard for all our environments.

### What ? 

For such needs, we chose [Gatus](https://github.com/TwinProduction/gatus) and deployed it on [Heroku](https://www.heroku.com/home).
We used Heroku rather than Scalingo because it is important to have health check in another platform/server/region. Indeed, if you do not split your environment, and your cloud provider is having troubles, your health check is also impacted. 

#### Deployment on Heroku
To deploy [Gatus](https://github.com/TwinProduction/gatus) on Heroku, we created `Dockerfile` and `heroku.yml` to specify Heroku to use `Dockerfile` for building the application :

Dockerfile : 
```Dockerfile
FROM twinproduction/gatus
ADD config.yaml ./config/config.yaml
```

heroku.yml: 
```yaml
build:
  docker:
    web: Dockerfile
```

Also, we create config file : 

```yaml
web:
  port: ${PORT} 
services:
  - name: DevOps Project PaaS - Production
    group: core
    url: "https://ing4ecedevops-production.osc-fr1.scalingo.io/"
    interval: 30s
    conditions:
      - "[STATUS] == 200"
      - "[RESPONSE_TIME] < 1000"
  - name: DevOps Project PaaS - Staging
    url: "https://ing4ecedevops-staging.osc-fr1.scalingo.io/"
    interval: 30s
    conditions:
      - "[STATUS] == 200"
      - "[RESPONSE_TIME] < 1000"
```


Now we have [Health Check on Heroku](https://ing4-devops-health-check.herokuapp.com/) : 

![Healthcheck](docs/img/healt-check.png)


 
## Authors
|[<img src="https://avatars0.githubusercontent.com/u/44112798?s=460&u=a8f868efc70d6de5cda4be9be472ddf7b8959c8a&v=4.png=" width="150" />](https://github.com/BBnours) | [<img src="https://avatars3.githubusercontent.com/u/56677859?s=400&v=4" width="150" />](https://github.com/HugoPauthier) | [<img src="https://avatars1.githubusercontent.com/u/26384707?s=460&u=1726aa4c2fbafed2efe9062cc30cdd4fe1c09b7e&v=4" width="150" />](https://github.com/VincentHardouin)|
|:---:|:---:|:---:|
|[Olivier Gomes](https://github.com/BBnours) | [Hugo Pauthier](https://github.com/HugoPauthier) | [Vincent Hardouin](https://github.com/VincentHardouin)|

## Grading 

| Subject                                                         |   Code    | Max. grade|Do|
|:----------------------------------------------------------------|:---------:|:---------:|:---------|
| Enriched web application with automated tests                   |   APP     |    +1     | :white_check_mark: |
| Continuous Integration and Continuous Delivery (and Deployment) |   CICD    |    +3     | :white_check_mark: |
| Containerisation with Docker                                    |   D       |    +1     | :white_check_mark: |
| Orchestration with Docker Compose                               |   DC      |    +2     | :white_check_mark: |
| Orchestration with Kubernetes	                                  |   KUB     |    +4     | :white_check_mark: |
| Service mesh using Istio                                        |   IST     |    +2     | :white_check_mark: |
| Infrastructure as code using Ansible                            |   IAC     |    +4     | :white_check_mark: |
| Accurate project documentation in README.md file                |   DOC     |    +3     | :white_check_mark: |
| Bonus : Generate automatically CHANLEGOG.md with PR title       |   BNS     |    +1     | :white_check_mark: |
| Bonus : Add e2e tests with Cypress                              |   BNS     |    +1     | :white_check_mark: |
| Bonus : Build docker image automatically                        |   BNS     |    +1     | :white_check_mark: |
| Bonus : Create Healthcheck app                                  |   BNS     |    +1     | :white_check_mark: |
| Bonus : Swagger                                                 |   BNS     |    +1     | :white_check_mark: |
| Bonus : Load testing with Artillery.io                          |   BNS     |    +1     | :white_check_mark: |
