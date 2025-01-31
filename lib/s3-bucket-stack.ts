import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';


export class S3BucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

 
    const imageProcessingBucket = new s3.Bucket(this, 'ImageProcessingBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY, 
    });

   
    new cdk.CfnOutput(this, 'ImageProcessingBucketArn', {
      value: imageProcessingBucket.bucketArn,
      exportName: 'ImageProcessingBucketArn', 
    });


  }
}
