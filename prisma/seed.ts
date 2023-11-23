const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

let db = new PrismaClient();

async function main() {
  const user = await db.user.findUnique({
    where: {
      email: "admin@gmail.com",
    },
  });

  if (user) {
    console.log(`
    ==> Superuser already exists
    ==> email: ${user.email}
    exiting with no new changes...
  `);
    return;
  }

  const hashedPassword = await bcrypt.hash("Password1", 10);
  const newUser = await db.user.create({
    data: {
      email: "admin@gmail.com",
      password: hashedPassword,
    },
  });

  console.log(`
    User created with:
    ==> email: ${newUser.email}
    ==> password: "Password1"
  `);

  newUser.role = "admin";
  await db.user.update({
    where: {
      id: newUser.id,
    },
    data: newUser,
  });
  console.log(`
    Seeded user role updated with:
    ==> role: ${newUser.role}
  `);

  console.log("==> User profile created!!");
  const newUserProfile = await db.userProfile.create({
    data: {
      firstName: "Super",
      lastName: "Admin",
      userId: newUser.id,
      bio: "Hey, this is a default superuser profile created by the seed script",
      adminKey: "justarandomadminkey",
    },
  });
  console.log("==> Profile data populated!!");
  console.info("==> Seeding complete!!");
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
