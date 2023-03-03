import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { FetchTransactionsArgs } from 'src/dto/fetch-transactions.input';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  // Get a single post
  async trasanction(id: string): Promise<Transaction | null> {
    const data = await this.prisma.transaction.findUnique({
      include: {
        account: true,
        category: true,
      },
      where: {
        id: id,
      },
    });
    return data;
  }

  // Get multiple posts
  async trasanctions(
    args: FetchTransactionsArgs = { skip: 0, amountToFetch: 5 },
  ): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      include: {
        account: true,
        category: true,
      },
      skip: args.skip,
      take: args.amountToFetch,
    });
  }
}
