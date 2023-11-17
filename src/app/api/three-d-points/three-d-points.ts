import { Metadata } from "@/types";
import { connectToPinecone } from "@/utils/connectToPinecone";
import { ScoredPineconeRecord } from "@pinecone-database/pinecone";
import { DEFAULT_VECTOR } from "./constants";
// import TSNE from "tsne-js";

// let model = new TSNE({
//   dim: 3,
//   perplexity: 30.0,
//   earlyExaggeration: 4.0,
//   learningRate: 100.0,
//   nIter: 1000,
//   metric: "euclidean",
// });

const EVERYTHING = 1000;

export const threeDPoints = async () => {
  const allVectors = await getAllVectors();

  return allVectors;
  // const vectors = allVectors.map((vector) => vector.values);
  // model.init({
  //   data: vectors,
  // });
  // model.run();
  // let output = model.getOutput();

  // return output;
};

console.log(DEFAULT_VECTOR.length);

const getAllVectors = async (): Promise<ScoredPineconeRecord<Metadata>[]> => {
  const index = await connectToPinecone();

  const queryResult = await index.query({
    vector: DEFAULT_VECTOR,
    topK: EVERYTHING,
    includeMetadata: true,
  });
  return queryResult.matches || [];
};
