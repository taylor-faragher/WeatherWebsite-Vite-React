#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {WeatherWebsite} from './weather-website';

class WeatherWebsiteStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
        super(parent, name, props);

        new WeatherWebsite(this, 'WeatherWebsite', {
            domainName: this.node.tryGetContext('domain'),
            siteSubDomain: this.node.tryGetContext('subdomain'),
        });
    }
}

const app = new cdk.App();

new WeatherWebsiteStack(app, 'taylorsweatherwebsite', {
    env: {
        account: process.env.AWS_ACCOUNT_NUMBER,
        region: 'us-east-1',
    },
});

app.synth();
