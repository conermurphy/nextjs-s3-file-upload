declare namespace NodeJS {
  export interface ProcessEnv {
    S3_ACCESS_KEY: string;
    S3_SECRET_KEY: string;
    S3_BUCKET_NAME: string;
    S3_REGION: string;
  }
}
