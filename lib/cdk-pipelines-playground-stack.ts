import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import * as sm from "aws-cdk-lib/aws-secretsmanager";
import { MyAppStage } from "./my-app-stage";

export class CdkPipelinesPlaygroundStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const githubToken = sm.Secret.fromSecretNameV2(
      this,
      "GitHubToken",
      "cdk-pipelines-playground-token"
    );
    const repo = "nagacchiken/cdk-pipelines-playground";
    const branch = "main";

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "cdk-pipelines-playground-pipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(repo, branch, {
          authentication: githubToken.secretValueFromJson(
            "cdk-pipelines-playground-token"
          ),
        }),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    const deploy = new MyAppStage(this, "Deploy");
    const deployStage = pipeline.addStage(deploy);
  }
}
