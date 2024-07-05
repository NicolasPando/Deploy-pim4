import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { order } from './order.entity';

@Entity({
  name:"users"
})
export class users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type:"varchar",length: 50, nullable:false })
  name: string;

  @Column({ type:"varchar",length: 50, nullable:false, unique: true })
  email: string;

  @Column({ type:"varchar",length: 128, nullable:false })
  password: string;

  @Column({type:'int' })
  phone: number;

  @Column({ type:"varchar", length: 50})
  country: string;

  @Column('text')
  address: string;

  @Column({ type:"varchar", length: 50 })
  city: string;

  @Column({default:false,})
  isAdmin:boolean

  @OneToMany(() => order, (order) => order.user)
  @JoinColumn({name:'order_id'})
  orders: order[];
}