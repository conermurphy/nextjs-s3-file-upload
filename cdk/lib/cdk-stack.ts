import * as cdk from 'aws-cdk-lib';
import { AccessKey, PolicyStatement, User } from 'aws-cdk-lib/aws-iam';
import { BlockPublicAccess, Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class NextjsPresignedUrlsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Create new S3 Bucket with public read access
    const s3Bucket = new Bucket(this, 'FileUploadS3', {
      bucketName: 'file-upload-s3',
      publicReadAccess: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      versioned: true,
      cors: [
        {
          allowedHeaders: ['*'],
          allowedMethods: [HttpMethods.GET, HttpMethods.PUT],
          allowedOrigins: ['*'],
          exposedHeaders: [],
          maxAge: 3000,
        },
      ],
    });

    // 2. Create new IAM User with PutObject access to the S3 Bucket
    const iamUser = new User(this, 'FileUploadUser');
    const putObjectPolicy = new PolicyStatement({
      actions: ['s3:PutObject'],
      resources: [`${s3Bucket.bucketArn}/*`],
    });

    iamUser.addToPolicy(putObjectPolicy);

    // 3. Create and output the Access Key and Secret Key for the IAM User
    const accessKey = new AccessKey(this, 'FileUploadAccessKey', {
      user: iamUser,
    });

    new cdk.CfnOutput(this, 'S3BucketUrl', {
      value: s3Bucket.bucketDomainName,
    });

    new cdk.CfnOutput(this, 'AccessKey', {
      value: accessKey.accessKeyId,
    });

    // NOTE: This is not a good or recommended practice, but for the sake of the demo, we will output the secret key
    new cdk.CfnOutput(this, 'SecretAccessKey', {
      value: accessKey.secretAccessKey.unsafeUnwrap(),
    });
  }
}
