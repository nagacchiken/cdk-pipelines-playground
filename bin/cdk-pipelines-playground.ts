#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CdkPipelinesPlaygroundV2Stack } from "../lib/cdk-pipelines-playground-stack";

const app = new cdk.App();
new CdkPipelinesPlaygroundV2Stack(app, "CdkPipelinesPlaygroundV2");
