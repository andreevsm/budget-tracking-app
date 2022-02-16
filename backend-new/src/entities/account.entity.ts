import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  created_at: Date;

  @Column()
  currency_id: number;

  @Column()
  amount: number;
}
