import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();

  const accountSeedPromise = prisma.$executeRaw`
  COPY accounts (
    id,
    name,
    bank
    )
  FROM
    '/docker-entrypoint-initdb.d/accounts.csv' DELIMITER ',' CSV HEADER;
`;

  const categorySeedPromise = prisma.$executeRaw`
COPY categories (
  id,
  name,
  color
  )
FROM
  '/docker-entrypoint-initdb.d/categories.csv' DELIMITER ',' CSV HEADER;
`;

  const transactionsSeedPromise = prisma.$executeRaw`
COPY transactions (
  id,
	"accountId",
	"categoryId",
	reference,
	amount,
	currency,
	"date"
  )
FROM
  '/docker-entrypoint-initdb.d/transactions.csv' DELIMITER ',' CSV HEADER;
`;

  await Promise.all([
    accountSeedPromise,
    categorySeedPromise,
    transactionsSeedPromise,
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
