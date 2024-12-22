import { DatabaseConfig } from './types';
import { Pool } from 'pg';
import { createPool } from 'mysql2/promise';
import { MongoClient } from 'mongodb';

export class DatabaseIntegration {
  private connection: any;
  private type: DatabaseConfig['type'];

  constructor(config: DatabaseConfig) {
    this.type = config.type;
    this.connection = this.createConnection(config);
  }

  private createConnection(config: DatabaseConfig) {
    switch (config.type) {
      case 'postgres':
        return new Pool({
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.username,
          password: config.password,
          ssl: config.ssl,
        });

      case 'mysql':
        return createPool({
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.username,
          password: config.password,
          ssl: config.ssl,
        });

      case 'mongodb':
        const url = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
        return new MongoClient(url);

      default:
        throw new Error(`Unsupported database type: ${config.type}`);
    }
  }

  async query(sql: string, params?: any[]) {
    try {
      switch (this.type) {
        case 'postgres':
        case 'mysql':
          const result = await this.connection.query(sql, params);
          return result.rows || result[0];

        case 'mongodb':
          // MongoDB uses different query syntax
          throw new Error('MongoDB queries should use the collection methods');

        default:
          throw new Error(`Unsupported database type: ${this.type}`);
      }
    } catch (error) {
      console.error('Database query failed:', error);
      throw error;
    }
  }

  async close() {
    await this.connection.end();
  }
}