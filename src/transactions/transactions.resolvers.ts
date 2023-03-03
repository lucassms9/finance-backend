import { Resolver, Query, Args } from '@nestjs/graphql';
import { FetchTransactionsArgs } from 'src/dto/fetch-transactions.input';
import { TransactionService } from './transactions.service';

@Resolver('Transaction')
export class TransactionResolvers {
  constructor(private readonly transactionService: TransactionService) {}

  @Query('transactions')
  async transactions(@Args() args: FetchTransactionsArgs) {
    return this.transactionService.trasanctions(args);
  }

  @Query('transaction')
  async transaction(@Args('id') args: string) {
    return this.transactionService.trasanction(args);
  }
}
