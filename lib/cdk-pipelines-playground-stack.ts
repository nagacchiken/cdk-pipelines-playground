import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
// import * as sm from "aws-cdk-lib/aws-secretsmanager";
import * as ssm from "aws-cdk-lib/aws-ssm"; 
import { MyAppStage } from "./my-app-stage";

export class CdkPipelinesPlaygroundStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // GitHubトークンを取得する場合
    // const githubToken = sm.Secret.fromSecretNameV2(
    //   this,
    //   "GitHubToken",
    //   "cdk-pipelines-playground-token"
    // );

    // SSMからconnectionArnを取得
    const connectionArn = ssm.StringParameter.valueForStringParameter(
      this,
      "/cdk-pipelines-playground/connection-arn",
    );

    const repo = "nagacchiken/cdk-pipelines-playground";
    const branch = "main";

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "cdk-pipelines-playground-pipeline",
      synth: new ShellStep("Synth", {
        // codeconnectionsを利用する場合
        input: CodePipelineSource.connection(repo, branch, {
          connectionArn,
        }),
         // GitHubトークンを取得する場合
        // input: CodePipelineSource.gitHub(repo, branch, {
        //   authentication: githubToken.secretValueFromJson("github-token"),
        // }),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    const deploy = new MyAppStage(this, "Deploy");
    const deployStage = pipeline.addStage(deploy);
  }
}
