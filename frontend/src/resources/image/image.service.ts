import { useAuth } from "../user/authentication.service";
import { Image } from "./image.resource";

class ImageService {
  baseUrl: string = "http://localhost:8080/v1/images";
  auth = useAuth();

  async findImage(query?: string, extension?: string): Promise<Image[]> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}?query=${query}&extension=${extension}`;
    const response = await fetch(url, {
      headers:{
        "Authorization": `Bearer ${userSession?.accessToken}`
      }
    });
    return await response.json();
  }

  async saveImage(data: FormData): Promise<string> {
    const userSession = this.auth.getUserSession();
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      body: data,
      headers:{
        "Authorization": `Bearer ${userSession?.accessToken}`
      }
    });
    return response.headers.get("location") ?? "";
  }
}

export const useImageService = () => new ImageService();
