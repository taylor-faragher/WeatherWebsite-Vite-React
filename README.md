# Taylor's Weather Website using Vite, React, CDK and Typescript

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This is a production ready frontend built using React, Typescript, Vite, and automated with CDK. The API called is provided by the Weather Lambda backend project. This project is automatically deployed using cdk. See the steps below to run this project yourself.

# Installation

1. `cd` to the repo on your local machine
2. Run `yarn`
3. Run steps to bootstrap your AWS account. Steps can be found here: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html
4. Run `cd cdk && yarn` to install dependencies for CDK
5. Run `cd..`
6. Make sure your AWS region and account number are exported in your terminal:
   - `export REGION=us-east-1`
   - `export AWS-ACCOUNT_NUMBER=<accountNumber>`
7. Run `yarn deploy`

# Running Locally
1. `cd` into the root directory of the project
2. Run `yarn`
3. Run `yarn dev`

# Testing

### Unit Testing
1. `cd` to the root directory of the project
2. Run `yarn`
3. Run `yarn test`

### E2E Testing
1. `cd` to the root directory of the project
2. Run `yarn`
3. Run `yarn:interactive` to see Cypress runner OR `yarn:headless` to run tests in headless mode