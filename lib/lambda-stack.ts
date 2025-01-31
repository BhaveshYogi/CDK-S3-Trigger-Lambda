import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Fn } from 'aws-cdk-lib';
import path = require('path');
import { Construct } from 'constructs';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketArn = Fn.importValue('ImageProcessingBucketArn');
    const imageProcessingBucket = s3.Bucket.fromBucketArn(this, 'ImportedBucket', bucketArn);

    const fileProcessingLambda = new lambda.Function(this, 'FileProcessingLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      environment: {
        BUCKET_NAME: imageProcessingBucket.bucketName,
      },
    });

    imageProcessingBucket.grantReadWrite(fileProcessingLambda); 

    imageProcessingBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED_PUT,
      new s3n.LambdaDestination(fileProcessingLambda)
    );
  }
}
//cdk list