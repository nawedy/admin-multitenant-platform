export interface APIIntegration {
  id: string;
  name: string;
  type: 'unsplash' | 'openai' | 'database' | 'custom';
  config: Record<string, any>;
  enabled: boolean;
}

export interface DatabaseConfig {
  type: 'postgres' | 'mysql' | 'mongodb';
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
}

export interface APICredentials {
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  refreshToken?: string;
}