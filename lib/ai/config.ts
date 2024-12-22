import { AIModelConfig, AIServiceConfig } from './types';

const defaultModelConfig: AIModelConfig = {
  model: 'gpt-4',
  temperature: 0.7,
  max_tokens: 2048,
  top_p: 1,
};

export const aiConfig: AIServiceConfig = {
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: 'https://api.openai.com/v1',
  modelConfig: defaultModelConfig,
};