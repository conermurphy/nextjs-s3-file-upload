# Next.js App Router, AWS S3 Bucket Presigned URLs

In this repository, is an example Next.js App Router project and AWS CDK stack that shows how to upload files (image in this example) to an AWS S3 bucket via presigned URLs generated on a router handler and display them on the browser.

## Packages Used

Below are the packages used in the project to generaete the presigned URLs as well as handle the form logic and submission. Alongside these, we use Next.js 13 and React 18.

- [`@aws-sdk/client-s3`](https://www.npmjs.com/package/@aws-sdk/client-s3)
- [`@aws-sdk/s3-request-presigner`](https://www.npmjs.com/package/@aws-sdk/s3-request-presigner)
- [`react-hook-form`](https://www.npmjs.com/package/react-hook-form)

## Getting Started

If you would like to run the project for yourself, you can clone the repository and run the following commands:

- `npm install` (performed in both the root directory and `cdk` directory)
- `cdk deploy` (performed in the `cdk` directory)
- `npm run dev` (performed in the root directory)

You'll also need to configure the `.env.local` file which you can do by copying the `.env.local.example` file and renaming it to `.env.local` and filling in the values using the values outputted from the `cdk deploy` command.

## Guide

If you would like to [see the full written tutorial for this project, you can check out my blog post here.](https://conermurphy.com/blog/presigned-urls-nextjs-s3-upload)