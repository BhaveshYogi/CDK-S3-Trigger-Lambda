import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class IamRoleStack extends cdk.Stack {
  public readonly lamdaRole: iam.IRole;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.lamdaRole = new iam.Role(this, 'LamdaS3AccessRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),  
    });

    this.lamdaRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject', 's3:PutObject'],
        resources: ['arn:aws:s3:::ImageProcessingBucket/*'],  
      })
    );

    this.lamdaRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')  
    );
  }
}
