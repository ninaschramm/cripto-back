import AWS, { S3 } from 'aws-sdk';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3();

const uploadFile = (filePath: string, keyName: string): Promise<S3.ManagedUpload.SendData> => {
    return new Promise((resolve, reject) => {
        try {
            const file = fs.readFileSync(filePath);
            const BUCKET: string = process.env.AWS_BUCKET_NAME || '';

            const uploadParams: S3.PutObjectRequest = {
                Bucket: BUCKET,
                Key: keyName,
                Body: file,
            };

            s3.upload(uploadParams, function (err: Error, data: S3.ManagedUpload.SendData) {
                if (err) {
                    return reject(err);
                }
                if (data) {
                    return resolve(data);
                }
            });
        } catch (err) {
            return reject(err);
        }
    });
};

const getImageUrl = async (key: string): Promise<string> => {
    const BUCKET: string = process.env.AWS_BUCKET_NAME || '';
    const EXPIRATION_TIME: number = 3600; // Expiration time in seconds
  
    const params = {
      Bucket: BUCKET,
      Key: key,
      Expires: EXPIRATION_TIME,
    };
  
    return new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', params, (err: Error, url: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(url || '');
        }
      });
    });
  };
  

const helperFunctions = {
    uploadFile,
}

export default helperFunctions;