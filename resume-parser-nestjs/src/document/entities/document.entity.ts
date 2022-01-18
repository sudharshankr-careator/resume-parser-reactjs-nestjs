import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity, PrimaryGeneratedColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class Document {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  documenttype: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  documentname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fileurl: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  filename: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fileextension: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  remarks: string;

  @Field()
  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdat: Date;

  @Field()
  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedat: Date;

  @Field()
  @Column({ nullable: true, default: 'admin', length: 50 })
  createdby: string;

  @Field()
  @Column({ nullable: true, default: 'admin', length: 50 })
  updatedby: string;

  @Field({ nullable: true })
  @Column({ nullable: false, default: true })
  isactive: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  referenceid?: number;


}
