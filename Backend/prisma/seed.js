const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const SALT_ROUNDS = 12;

async function main() {
  console.log("Start seeding ...");

  // Cleanup existing data (in correct order due to foreign keys)
  await prisma.purchase.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.issue.deleteMany();
  await prisma.user.deleteMany();

  // Hash password
  const hashedPassword = await bcrypt.hash('test', SALT_ROUNDS);

  // Create users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      isPremium: true
    }
  });

  const regularUser = await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      email: 'user@gmail.com',
      name: 'Regular User',
      password: hashedPassword,
      role: 'USER',
      isPremium: false
    }
  });

  console.log({ admin, regularUser });

  // Create issues
  const janIssue = await prisma.issue.create({
    data: {
      title: 'January Issue 2026',
      description: 'The first issue of the new year.',
      month: 'January',
      year: '2026',
      pdfUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
      price: 500.00
    }
  });

  const febIssue = await prisma.issue.create({
    data: {
      title: 'February Issue 2026',
      description: 'Insights into technology trends.',
      month: 'February',
      year: '2026',
      pdfUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
      price: 750.00
    }
  });

  console.log({ janIssue, febIssue });

  // Create purchases
  const purchase1 = await prisma.purchase.create({
    data: {
      userId: regularUser.id,
      magazineIssueId: janIssue.id,
      amount: 4.99,
      status: 'paid',
      paidAt: new Date()
    }
  });

  const purchase2 = await prisma.purchase.create({
    data: {
      userId: regularUser.id,
      magazineIssueId: febIssue.id,
      amount: 4.99,
      status: 'pending'
    }
  });

  console.log({ purchase1, purchase2 });

  // Create favorite
  const favorite = await prisma.favorite.create({
    data: {
      userId: regularUser.id,
      magazineIssueId: janIssue.id
    }
  });

  console.log({ favorite });
  console.log("Seeding finished.");
}

// Run the seed function
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });