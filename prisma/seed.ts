import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const assitant = await prisma.user.upsert({
    where: { id: 1, fingerprint: "assistant" },
    update: {},
    create: {
      fingerprint: "assistant",
      entropy: "assistant",
    },
  });
  console.log({ assitant });
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
