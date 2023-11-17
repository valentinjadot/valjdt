import { IPoint, Metadata } from "@/types";
import { connectToPinecone } from "@/utils/connectToPinecone";
import { ScoredPineconeRecord } from "@pinecone-database/pinecone";
import { DEFAULT_VECTOR } from "./constants";
import * as druid from "@saehrimnir/druidjs";

interface IHashOfCoordinates {
  [key: number]: number;
}

const EVERYTHING = 1000;

export const threeDPoints = async (): Promise<IPoint[]> => {
  const allVectors = await getAllVectors();

  const hashOfCoordinates = reduceDimensionality(
    allVectors.map((vector) => vector.values)
  );

  const points = generatePoints(hashOfCoordinates);

  return points;
};

const generatePoints = (hashOfCoordinates: IHashOfCoordinates) => {
  let points: IPoint[] = [];
  for (let i = 0; i < Object.keys(hashOfCoordinates).length; i += 3) {
    const x = points[i] || 0;
    const y = points[i + 1] || 0;
    const z = points[i + 2] || 0;

    points.push({
      x: hashOfCoordinates[i] || 0,
      y: hashOfCoordinates[i + 1] || 0,
      z: hashOfCoordinates[i + 2] || 0,
    });
  }
  return points;
};

const getAllVectors = async (): Promise<ScoredPineconeRecord<Metadata>[]> => {
  const index = await connectToPinecone();

  const queryResult = await index.query({
    vector: DEFAULT_VECTOR,
    topK: EVERYTHING,
    includeMetadata: true,
    includeValues: true,
  });
  return queryResult.matches || [];
};

const reduceDimensionality = (vectorValues: number[][]) => {
  let matrix = druid.Matrix.from(vectorValues);

  const dr = new druid.TSNE(matrix, {
    d: 3,
    perplexity: 50,
    seed: 1536,
  }).transform();

  const validReducedData =
    typeof dr._data === "object" &&
    Object.keys(dr._data).length > 0 &&
    typeof dr._data[0] === "number";

  if (!validReducedData) throw new Error("Dimensionality reduction failed");

  return dr._data as IHashOfCoordinates;
};
