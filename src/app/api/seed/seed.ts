import { getEmbeddings } from "@/utils/embeddings";
import {
  Document,
  MarkdownTextSplitter,
} from "@pinecone-database/doc-splitter";
import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { chunkedUpsert } from "../../utils/chunkedUpsert";
import md5 from "md5";

import { truncateStringByBytes } from "@/utils/truncateString";
import { connectToPinecone } from "@/utils/connectToPinecone";

async function seed(seedContent: string) {
  try {
    const documents = await prepareDocument(seedContent);
    const vectors = await Promise.all(documents.flat().map(embedDocument));
    const index = await connectToPinecone();
    await chunkedUpsert(index, vectors, "", 10);

    // Return the first document
    return documents[0];
  } catch (error) {
    console.error("Error seeding:", error);
    throw error;
  }
}

async function embedDocument(doc: Document): Promise<PineconeRecord> {
  try {
    // Generate OpenAI embeddings for the document content
    const embedding = await getEmbeddings(doc.pageContent);

    // Create a hash of the document content
    const hash = md5(doc.pageContent);

    // Return the vector embedding object
    return {
      id: hash, // The ID of the vector is the hash of the document content
      values: embedding, // The vector values are the OpenAI embeddings
      metadata: {
        // The metadata includes details about the document
        chunk: doc.pageContent, // The chunk of text that the vector represents
        text: doc.metadata.text as string, // The text of the document
        url: doc.metadata.url as string, // The URL where the document was found
        hash: doc.metadata.hash as string, // The hash of the document content
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("Error embedding document: ", error);
    throw error;
  }
}

async function prepareDocument(content: string): Promise<Document[]> {
  // Get the content of the page

  const pageContents = splitByMarkdownHeader(content);

  // Split the documents using the provided splitter
  const docs = pageContents.map(
    (pageContent) =>
      new Document({
        pageContent,
        metadata: {
          text: truncateStringByBytes(pageContent, 36000),
          hash: md5(pageContent),
        },
      })
  );

  console.log(docs);

  // Map over the documents and add a hash to their metadata
  return docs;
}

function splitByMarkdownHeader(content: string): string[] {
  return content.split(/(?=^#)/gm);
}

export default seed;
