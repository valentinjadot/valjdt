import { Metadata } from "@/types";
import { connectToPinecone } from "./connectToPinecone";
import {
  Pinecone,
  type ScoredPineconeRecord,
} from "@pinecone-database/pinecone";

// The function `getMatchesFromEmbeddings` is used to retrieve matches for the given embeddings
const getMatchesFromEmbeddings = async (
  embeddings: number[],
  topK: number
): Promise<ScoredPineconeRecord<Metadata>[]> => {
  // Obtain a client for Pinecone
  const index = await connectToPinecone();

  try {
    // Query the index with the defined request
    const queryResult = await index.query({
      vector: embeddings,
      topK,
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (e) {
    // Log the error and throw it
    console.log("Error querying embeddings: ", e);
    throw new Error(`Error querying embeddings: ${e}`);
  }
};

export { getMatchesFromEmbeddings };
