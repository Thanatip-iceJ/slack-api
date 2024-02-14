import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
  CLOUD_NAME,
} from 'contrants';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_SECRET_KEY,
    });
  }
  async uploadImage(filePath: string) {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(filePath, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
