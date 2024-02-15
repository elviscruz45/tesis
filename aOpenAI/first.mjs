import OpenAI from "openai";
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
});

async function first() {
  const response = await openai.models.list();
  console.log(response);
}

first();
