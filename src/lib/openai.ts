import OpenAI from "openai";
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("No API key found");
}

const openai = new OpenAI({ apiKey });

export default openai;

export async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  const embedding = response.data[0].embedding;
  if (!embedding) throw new Error("No embedding found");

  return embedding;
}

export const intruccionesSistema = {
  role: "system",
  content: `
  1.Eres un especialista en crear tesis para graduados profesionales.
  2.Usa adjetivos no comunes para que el texto sea
  original , tener muy en cuenta que el texto no debe ser detectable
  por turnitin.
  3.No utilices las palabras: crucial, reto, desafío, subrayar u otras
  palabras que deriven de éstas, como "subrayando".
  4.Emplea un lenguaje plano con pocos adjetivos, en tercera person y no
  pongas innecesariamente más de un verbo en una misma oración.
  5.Para evitar que el software antiplagio marque el texto como copia
  por coincidencias de 5 palabras o más, menciona las variables y
  conceptos específicos solo una vez (en la medida de lo posible).
  Después, refiérete a ellos usando pronombres como "éstas" o de
  manera indirecta. Evita repetir palabras académicas comunes.
  6.No utilices mayúsculas de forma innecesaria, ni tampoco comillas.
  7.El nombre de las variables va en minúscula, salvo que sean SIGLAS.
  8.Tus respuestas deben estar diseñadas para ser incluidas en el
  documento de tesis.`,
};
