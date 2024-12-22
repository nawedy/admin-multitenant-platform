import { createApi } from 'unsplash-js';
import { APICredentials } from './types';

export class UnsplashIntegration {
  private api: ReturnType<typeof createApi>;

  constructor(credentials: APICredentials) {
    this.api = createApi({
      accessKey: credentials.apiKey!,
    });
  }

  async searchPhotos(query: string, page = 1) {
    const result = await this.api.search.getPhotos({
      query,
      page,
      perPage: 20,
    });

    if (result.errors) {
      throw new Error('Failed to search photos: ' + result.errors[0]);
    }

    return result.response;
  }

  async getRandomPhoto(query?: string) {
    const result = await this.api.photos.getRandom({
      query,
      count: 1,
    });

    if (result.errors) {
      throw new Error('Failed to get random photo: ' + result.errors[0]);
    }

    return result.response;
  }
}