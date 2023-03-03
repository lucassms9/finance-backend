import { Field, Int, ArgsType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class FetchTransactionsArgs {
  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take = 15;

  @Field(() => String)
  search = '';

  @Field(() => String)
  account = '';

  @Field(() => String)
  bank = '';

  @Field(() => Date)
  initDate = '';

  @Field(() => Date)
  endDate = '';
}
