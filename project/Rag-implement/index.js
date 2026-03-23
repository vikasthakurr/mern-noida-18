import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { Document } from "@langchain/core/documents";
import { createRetrievalChain } from "@langchain/classic/chains/retrieval";
import { createStuffDocumentsChain } from "@langchain/classic/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let retrievalChain;
let isInitialized = false;

async function initializeRAG() {
  if (!process.env.GOOGLE_API_KEY) {
    console.error("Error: GOOGLE_API_KEY is not set in the .env file.");
    process.exit(1);
  }

  console.log("Fetching products from dummyjson API...");
  const res = await fetch("https://dummyjson.com/products?limit=100");
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  const jsonData = await res.json();
  const products = jsonData.products || [];

  console.log(`Processing ${products.length} products into documents...`);
  const documents = products.map((product) => {
    const content = `Product Name: ${product.title}
Brand: ${product.brand}
Category: ${product.category}
Description: ${product.description}
Price: $${product.price}
Rating: ${product.rating} / 5
Tags: ${product.tags ? product.tags.join(", ") : "None"}`;

    return new Document({
      pageContent: content,
      metadata: {
        id: product.id,
        category: product.category,
        title: product.title,
      },
    });
  });

  console.log(
    "Initializing local HNSWLib vector store with HuggingFace Embeddings...",
  );
  const embeddings = new HuggingFaceTransformersEmbeddings({
    modelName: "Xenova/all-MiniLM-L6-v2",
  });

  const vectorStore = await HNSWLib.fromDocuments(documents, embeddings);
  const retriever = vectorStore.asRetriever({ k: 3 });

  // Use the canonical name gemini-1.5-flash as the latest suffix was causing 404s in some environments
  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0.3,
  });

  const systemTemplate = `You are a helpful and knowledgeable shopping assistant for our e-commerce store.
Use the following pieces of retrieved context to answer the question.
If the answer is not in the context, say that you don't know or don't have information on that product.
Use the product names, prices, and descriptions exactly as they appear in the documentation. Keep the answer concise.

Context: {context}`;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["human", "{input}"],
  ]);

  const combineDocsChain = await createStuffDocumentsChain({
    llm,
    prompt,
  });

  retrievalChain = await createRetrievalChain({
    retriever,
    combineDocsChain,
  });

  console.log("RAG system initialized successfully.");
  isInitialized = true;
}

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!isInitialized) {
    return res
      .status(503)
      .json({
        error:
          "RAG system is still initializing. Please try again in a moment.",
      });
  }

  try {
    const response = await retrievalChain.invoke({
      input: message,
    });
    res.json({ answer: response.answer });
  } catch (error) {
    console.error("Error generating response:", error);
    res
      .status(500)
      .json({
        error:
          "Failed to generate response. Check your API key and network connection.",
      });
  }
});

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  await initializeRAG();
  console.log("✅ Chatbot ready for queries.");
});
