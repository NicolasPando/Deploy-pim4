import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { order } from './order.entity';
import { product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name:"orderdetail"
})
export class orderdetail {

  @ApiProperty({
    description:'debe ingresar un string con formato UUID',
    example:'550e8400-e29b-41d4-a716-446655440000'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description:'debe ingresar un number',
    example:'123.45'
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => order, (order) => order.orderDetail)
  @JoinColumn({name:'order-id'})
  order: order;

  @ManyToMany(()=>product)
  @JoinTable({
    name:'ORDERDETAILS_PRODUCTS',
    joinColumn:{
      name:'product_id',
      referencedColumnName:'id'
    },
    inverseJoinColumn:{
      name:'orderdetail_id',
      referencedColumnName:'id'
    }
  })
  products: product[];
}