import axios from "axios";
import { useAuth } from "./auth";

export class Wiki {
  id?: string;
  imageUrl?: string;
  name?: string;
  description?: string;
  createdDate?: string;
}

class WikiService {
  baseUrl: string = "http://localhost:8080/v1/wikis";
  auth = useAuth();

  async findWikis(query?: string): Promise<Wiki[]> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}?query=${query}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    return await response.json();
  }

  async saveWiki(data: FormData): Promise<string> {
    const userSession = this.auth.getUserSession();
    const response = await fetch(this.baseUrl, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    return response.headers.get("location") ?? "";
  }
}

export const useWikiService = () => new WikiService();
