import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { users } from './user.entity';
import { orderdetail } from './order-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name:"order"
})
export class order {

  @ApiProperty({
    description:'uuid v4 generado por la BBDD'
  })  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description:'debe ingresar una fecha con formato dd/mm/yy',
    example:'02/07/24'
  })
  @Column()
  date: Date;
  
  @OneToOne(() => orderdetail, (orderDetail) => orderDetail.order)
  orderDetail: orderdetail;

  @ManyToOne(() => users, (user) => user.orders)
  @JoinColumn({name:'user_id'})
  user: users;
}

