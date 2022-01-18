import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extname } from 'path';
import { Repository } from 'typeorm';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentService {
  updateDocumentInLocal(userid: any, file: Express.Multer.File) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
  ) {}
  create(createDocumentInput: CreateDocumentInput) {
    const doc = this.documentRepo.create(createDocumentInput);
    return this.documentRepo.save(doc);
  }

  findAll() {
    return this.documentRepo.find();
  }

  findOne(id: string) {
    return this.documentRepo.findOne(id);
  }

  update(id: string, updateDocumentInput: UpdateDocumentInput) {
    const up = this.documentRepo.create(updateDocumentInput);
    return this.documentRepo.update(id, up);
  }

  remove(id: string) {
    return this.documentRepo.delete(id);
  }
  async createDocumentInLocal(userid: any, file: Express.Multer.File) {
    const FILE = await this.documentRepo.save({
      documenttype: file.mimetype,
      documentname: file.originalname,
      description: file.mimetype,
      fileurl: file.path,
      filename: file.filename,
      fileextension: extname(file.originalname),
      referenceid: userid,
    });
    return FILE;
  }
  async updateDocument(userid: any, file: Express.Multer.File) {
    const FIND = await this.documentRepo.findOne({ referenceid: userid });
    const Cr = await this.documentRepo.create({
      documenttype: file.mimetype,
      documentname: file.originalname,
      description: file.mimetype,
      fileurl: file.path,
      filename: file.filename,
      fileextension: extname(file.originalname),
      referenceid: userid,
    });
    !FIND
      ? await this.documentRepo.save({
          documenttype: file.mimetype,
          documentname: file.originalname,
          description: file.mimetype,
          fileurl: file.path,
          filename: file.filename,
          fileextension: extname(file.originalname),
          referenceid: userid,
        })
      : await this.documentRepo.update(
          {
            referenceid: userid,
          },
          Cr,
        );
  }
}
