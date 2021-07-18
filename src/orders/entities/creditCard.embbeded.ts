import { Column } from 'typeorm';

export class CreditCard {
  @Column({ name: 'credit_card_number' })
  number: string;

  @Column({ name: 'credit_card_name' })
  name: string;

  @Column({ name: 'credit_card_cvv' })
  cvv: string;

  @Column({ name: 'credit_card_expiration_month' })
  expiration_month: string;

  @Column({ name: 'credit_card_expiration_year' })
  expiration_year: string;
}
