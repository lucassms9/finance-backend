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
  async trasanctions(args: FetchTransactionsArgs): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      where: {
        ...(args.account && { accountId: args.account }),
      },
      include: {
        account: true,
        category: true,
      },
      skip: args.skip || 0,
      take: args.take || 10,
    });
  }
}
