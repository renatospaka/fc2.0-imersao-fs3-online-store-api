import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from './orderItem.entity';

export enum OrderStatus {
  Approved = 'approved',
  Pending = 'pending',
  Canceled = 'canceled',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total: number;

  @Column()
  status: OrderStatus = OrderStatus.Pending;

  @Column()
  credit_card_number: string;

  @Column()
  credit_card_name: string;

  @Column()
  credit_card_cvv: string;

  @Column()
  credit_card_expiration_month: string;

  @Column()
  credit_card_expiration_year: string;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  beforeInsertActions() {
    this.generateId();
    this.calculateTotal();
  }

  generateId() {
    if (this.id) {
      return;
    }
    this.id = uuidv4();
  }

  calculateTotal() {
    return (this.total = this.items.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0));
  }
}
