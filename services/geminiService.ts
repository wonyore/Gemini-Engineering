import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBirthdayMotto = async (name: string, role: string, zodiac: string): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      请为一位名叫 ${name} 的女生（属${zodiac}）写一句温暖、富有哲理且充满仪式感的生日箴言（一句话）。
      
      要求：
      1. 语言风格：温暖、治愈、积极向上，贴合生日氛围。
      2. 内容方向：关注个人成长、内心平和、热爱生活，不要涉及编程或技术术语。
      3. 把它当作是送给她新一岁的“人生格言”。
      4. 仅返回箴言内容，不要加引号或其他解释。
      
      语言：中文。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "愿你的生活常温暖，日子总是温柔又闪光。生日快乐！";
  } catch (error) {
    console.error("Error generating motto:", error);
    return "预测未来的最好方式，就是去创造它。祝你生日快乐，岁岁欢喜！";
  }
};