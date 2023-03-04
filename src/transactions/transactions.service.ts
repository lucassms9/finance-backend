import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { FetchTransactionsArgs } from 'src/dto/fetch-transactions.input';
import { parseISO, isValid, startOfMonth, endOfMonth } from 'date-fns';

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
    let orConditions = [];
    if (args.search) {
      const parsedDate = parseISO(args.search);
      const isValidDate = isValid(parsedDate);

      if (!isNaN(Number(args.search))) {
        orConditions = [
          {
            amount: args.search,
          },
        ];
      } else if (isValidDate) {
        orConditions = [
          {
            date: {
              gte: new Date(args.search),
            },
          },
        ];
      } else {
        orConditions = [
          {
            account: {
              bank: args.search,
            },
          },

          {
            account: {
              name: args.search,
            },
          },
          {
            reference: args.search,
          },
          {
            category: {
              name: args.search,
            },
          },
        ];
      }
    }

    let dateWhere = {};
    if (args.initDate) {
      dateWhere = {
        ...dateWhere,
        gte: startOfMonth(new Date(args.initDate)),
      };
    }

    if (args.endDate) {
      dateWhere = {
        ...dateWhere,
        lte: endOfMonth(new Date(args.endDate)),
      };
    }

    return this.prisma.transaction.findMany({
      where: {
        ...(args.account && { accountId: args.account }),
        ...(args.bank && {
          account: {
            bank: args.bank,
          },
        }),
        date: dateWhere,
        AND: [
          {
            OR: orConditions,
          },
        ],
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
