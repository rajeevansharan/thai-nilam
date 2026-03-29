import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // Create Users
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@thainilam.com' },
    update: {},
    create: {
      email: 'admin@thainilam.com',
      name: 'Admin User',
      password: 'password123', // In a real app, hash this!
      role: 'ADMIN',
      isPremium: true,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user@thainilam.com' },
    update: {},
    create: {
      email: 'user@thainilam.com',
      name: 'Regular User',
      password: 'password123', // In a real app, hash this!
      role: 'USER',
      isPremium: false,
    },
  });
  
  console.log({ user1, user2 });

  // Create Issues
  const issue1 = await prisma.issue.create({
    data: {
      title: 'January Issue 2026',
      description: 'The first issue of the new year.',
      month: 'January',
      year: '2026',
      pdfUrl: 'https://example.com/pdf/jan2026.pdf',
      imageUrl: 'https://example.com/img/jan2026.jpg',
    },
  });

  const issue2 = await prisma.issue.create({
    data: {
      title: 'February Issue 2026',
      description: 'Insights into technology trends.',
      month: 'February',
      year: '2026',
      pdfUrl: 'https://example.com/pdf/feb2026.pdf',
      imageUrl: 'https://example.com/img/feb2026.jpg',
    },
  });

  console.log({ issue1, issue2 });

  console.log(`Seeding finished.`);
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
