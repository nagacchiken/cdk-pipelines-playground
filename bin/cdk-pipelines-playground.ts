#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CdkPipelinesPlaygroundStack } from "../lib/cdk-pipelines-playground-stack";

const app = new cdk.App();
new CdkPipelinesPlaygroundStack(app, "CdkPipelinesPlayground", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

