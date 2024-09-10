import { Image } from "./image.resource";

class ImageService {
  baseUrl: string = "http://localhost:8080/v1/images";

  async findImage(query?: string, extension?: string): Promise<Image[]> {
    const url = `${this.baseUrl}?query=${query}&extension=${extension}`;
    const response = await fetch(url);
    return await response.json();
  }

  async saveImage(data: FormData): Promise<string> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      body: data,
    });
    return response.headers.get("location") ?? "";
  }
}

export const useImageService = () => new ImageService();
