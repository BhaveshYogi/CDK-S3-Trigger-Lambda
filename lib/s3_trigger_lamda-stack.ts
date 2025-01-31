import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {S3BucketStack} from './s3-bucket-stack';
import {IamRoleStack} from './iam-role-stack';
import {LambdaStack} from './lambda-stack';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class S3TriggerLamdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    const s3Stack = new S3BucketStack(this, 'S3BucketStack');

   
    const iamStack = new IamRoleStack(this, 'IamRoleStack');

   
    new LambdaStack(this, 'LambdaStack', {
    });
  }
}

