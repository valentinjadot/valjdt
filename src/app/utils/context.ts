import { ScoredVector } from "@pinecone-database/pinecone";
import { getMatchesFromEmbeddings } from "./getMatchesFromEmbeddings";
import { getEmbeddings } from "./embeddings";
import { Metadata } from "@/types";

// The function `getContext` is used to retrieve the context of a given message
export const getContext = async (
  message: string,
  topK: number = 3,
  maxTokens = 3000,
  minScore = 0.7,
  getOnlyText = true
): Promise<string | ScoredVector[]> => {
  // Get the embeddings of the input message
  const embedding = await getEmbeddings(message);

  if (!embedding) {
    throw new Error("Error getting embeddings");
  }

  // Retrieve the matches for the embeddings from the specified namespace
  const matches = await getMatchesFromEmbeddings(embedding, topK);

  // Filter out the matches that have a score lower than the minimum score
  const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore);

  if (!getOnlyText) {
    // Use a map to deduplicate matches by URL
    return qualifyingDocs;
  }

  let docs = matches
    ? qualifyingDocs.map((match) => (match.metadata as Metadata).chunk)
    : [];
  // Join all the chunks of text together, truncate to the maximum number of tokens, and return the result
  return docs.join("\n").substring(0, maxTokens);
};
