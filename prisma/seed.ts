const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

let db = new PrismaClient();

async function main() {
  const user = await db.user.create({
    data: {
      email: "admin@gmail.com",
      password: await bcrypt.hash("admin", 10),
    },
  });
  console.log(`
    User created with:
    ==> email: ${user.email}
    ==> password: "admin"
  `);

  user.role = "admin";
  await db.user.update({
    where: {
      id: user.id,
    },
    data: user,
  });
  console.log(`
    Seeded user role updated with:
    ==> role: ${user.role}
  `);
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
