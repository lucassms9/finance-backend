import { Module } from '@nestjs/common';
import { TransactionResolvers } from './transactions.resolvers';
import { TransactionService } from './transactions.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PrismaService, TransactionResolvers, TransactionService],
})
export class TransactionModule {}
