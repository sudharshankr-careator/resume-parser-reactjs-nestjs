import {
  Controller,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as fetch from 'node-fetch';
import { UploadDocInLocalInterceptor } from 'src/uploadfile';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private doumentService: DocumentService) {}

  @UseInterceptors(UploadDocInLocalInterceptor)
  @Post('society/:userid')
  uploadfile(
    @Param('userid') userid: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file, '>>');

    return this.doumentService.createDocumentInLocal(userid, file);
  }
  @UseInterceptors(UploadDocInLocalInterceptor)
  @Patch('society/:userid')
  async updateuploadfile(
    @Param('userid') userid: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file, '>>');
    const formData = new FormData();
    formData.append('resume', fs.createReadStream(file.path));

    await fetch('https://jobs.lever.co/parseResume', {
      method: 'POST',
      headers: {
        Origin: 'https://jobs.lever.co',
        Referer: 'https://jobs.lever.co/parse',
      },
      body: formData,
    })
      .then((response) => {
        console.log(
          '🚀 ~ file: document.controller.ts ~ line 48 ~ DocumentController ~ .then ~ response',
          response,
        );
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((response) => {
        console.log(
          '🚀 ~ file: document.controller.ts ~ line 52 ~ DocumentController ~ .then ~ response',
          response,
        );
      })
      .catch(console.error);

    return this.doumentService.updateDocument(userid, file);
  }
}
