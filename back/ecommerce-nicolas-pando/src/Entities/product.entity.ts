import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import { category } from './category.entity';
import { orderdetail } from './order-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name:"product"
})
export class product {

  @ApiProperty({
    description:'debe ingresar un string con formato UUID',
    example:'550e8400-e29b-41d4-a716-446655440000'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ApiProperty({
    description:'debe ingresar un string',
    example:'Logitech G502'
  })
  @Column({ type:"varchar", length: 50, unique:true, nullable:false})
  name: string;

  @ApiProperty({
    description:'debe ingresar un string',
    example:'The best mouse in the world'
  })
  @Column({type:"text",nullable:false})
  description: string;

  @ApiProperty({
    description:'debe ingresar un number',
    example:'39.99'
  })
  @Column({ type:'decimal',precision: 10, scale: 2, nullable:false})
  price: number;

  @ApiProperty({
    description:'debe ingresar un number',
    example:'12'
  })
  @Column({type:'int', nullable:false})
  stock: number;

  @ApiProperty({
    description:'debe ingresar un string',
    example:'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
  })
  @Column({ default: 'text' })
  imgUrl: string;

  @ManyToOne(() => category, (category) => category.products)
  @JoinColumn({name:'category_id'})
  category: category;

  @ManyToMany(() => orderdetail, (orderDetail) => orderDetail.products)
  orderDetail: orderdetail[];
}
