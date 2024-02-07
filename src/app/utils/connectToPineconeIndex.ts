import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "@/env.mjs";
import { Metadata } from "@/types";

export const connectToPineconeIndex = async () => {
  const pinecone = new Pinecone({
    environment: env.PINECONE_ENVIRONMENT,
    apiKey: env.PINECONE_API_KEY,
  });

  const indexes = await pinecone.listIndexes();

  if (!indexes.some((index) => index.name === env.PINECONE_INDEX_NAME)) {
    throw new Error(`Index ${env.PINECONE_INDEX_NAME} does not exist`);
  }

  const index = pinecone.Index<Metadata>(env.PINECONE_INDEX_NAME);

  return index;
};
