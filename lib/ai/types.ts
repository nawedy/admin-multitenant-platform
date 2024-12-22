export interface AICompletion {
  text: string;
  finish_reason: string;
}

export interface CodeSuggestion {
  code: string;
  explanation: string;
  path: string;
}

export interface AIModelConfig {
  model: string;
  temperature: number;
  max_tokens: number;
  top_p: number;
}

export interface AIServiceConfig {
  apiKey: string;
  baseURL: string;
  modelConfig: AIModelConfig;
}