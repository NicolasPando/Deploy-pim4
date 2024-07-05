import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name:"category"
})
export class category {

  @ApiProperty({
    description:'debe ingresar un string con formato UUID',
    example:'550e8400-e29b-41d4-a716-446655440000'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description:'debe ingresar una string',
    example:'Smartphone'
  })
  @Column({ type:"varchar",length: 50, nullable:false, unique:true })
  name: string;

  @OneToMany(() => product, (product) => product.category)
  @JoinColumn()
  products: product[];
}