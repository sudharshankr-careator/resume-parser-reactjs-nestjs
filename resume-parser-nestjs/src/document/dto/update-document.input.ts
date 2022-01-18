import { Field, PartialType } from '@nestjs/graphql';
import { CreateDocumentInput } from './create-document.input';

export class UpdateDocumentInput extends PartialType(CreateDocumentInput) {
  @Field()
  id: string;
}
