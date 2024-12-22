import { AICompletion, CodeSuggestion } from './types';
import { aiConfig } from './config';

export class AIService {
  private static async fetchCompletion(prompt: string): Promise<AICompletion> {
    const response = await fetch(`${aiConfig.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiConfig.apiKey}`,
      },
      body: JSON.stringify({
        ...aiConfig.modelConfig,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI completion');
    }

    return response.json();
  }

  static async generateCode(description: string): Promise<CodeSuggestion> {
    const prompt = `Generate code for: ${description}\nProvide explanation and file path.`;
    const completion = await this.fetchCompletion(prompt);
    
    // Parse the completion into structured format
    // This is a simplified example - you'd want more robust parsing
    const [code, explanation] = completion.text.split('---');
    
    return {
      code: code.trim(),
      explanation: explanation.trim(),
      path: 'suggested/path.ts', // You'd want to derive this from the context
    };
  }

  static async explainCode(code: string): Promise<string> {
    const prompt = `Explain this code:\n${code}`;
    const completion = await this.fetchCompletion(prompt);
    return completion.text;
  }

  static async suggestImprovements(code: string): Promise<string> {
    const prompt = `Suggest improvements for this code:\n${code}`;
    const completion = await this.fetchCompletion(prompt);
    return completion.text;
  }
}