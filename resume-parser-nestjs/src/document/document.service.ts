import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentService {
  async updateDocument(file: Express.Multer.File) {
    return file;
  }
}
