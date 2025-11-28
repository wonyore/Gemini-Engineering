import { GoogleGenAI } from "@google/genai";

// 备用文案库，用于 API 失败或未配置 Key 时展示
// 确保即使离线或无 Key，用户也能获得良好的体验
const FALLBACK_MOTTOS = [
  "愿你遍历山河，觉得人间值得。生日快乐！",
  "且将新火试新茶，诗酒趁年华。",
  "生活明朗，万物可爱，人间值得，未来可期。",
  "愿你拥有好运气，对一切充满感激，喜欢美好，也喜欢自己。",
  "所有的晦暗都留给过往，从遇见你开始，凛冬散尽，星河长明。",
  "愿你精致到老，眼里长着太阳，笑里全是坦荡。",
  "这一岁，要找到自己的光，也要成为别人的光。",
  "愿你时刻保持对生活的热爱，奔赴下一场山海。",
  "知足且上进，温柔且坚定。祝你岁岁欢喜。",
  "愿你的生活常温暖，日子总是温柔又闪光。",
  "保持热爱，奔赴山海。祝你生日快乐！",
  "做自己的太阳，无需凭借谁的光。"
];

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    // 如果没有 API KEY，直接抛出错误，进入 catch 逻辑使用备用文案
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

    return response.text || getRandomFallback();
  } catch (error) {
    console.warn("API调用失败或未配置API Key，使用本地备用文案:", error);
    // 随机返回一句备用文案，确保每次点击都有变化
    return getRandomFallback();
  }
};

const getRandomFallback = () => {
  const randomIndex = Math.floor(Math.random() * FALLBACK_MOTTOS.length);
  return FALLBACK_MOTTOS[randomIndex];
};