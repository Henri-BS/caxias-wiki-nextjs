import { useAuth } from "../user/authentication.service";
import { Story } from "./story.resource";

class StoryService {
  baseUrl: string = "http://localhost:8080/v1/stories";
  auth = useAuth();

  async findStories(query?: string): Promise<Story[]> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}?query=${query}`;
    const response = await fetch(url, {
      headers:{
        "Authorization": `Bearer ${userSession?.accessToken}`
      }
    });
    return await response.json();
  }

  

  async saveStory(data: FormData): Promise<string> {
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

export const useStoryService = () => new StoryService();
