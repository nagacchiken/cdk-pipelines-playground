import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { S3Stack } from "./s3-stack";
import { LambdaStack } from "./lambda-stack";

// Define the stage
export class MyAppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new S3Stack(this, "S3Stack");
    
    new LambdaStack(this, "LambdaStack");
  }
}