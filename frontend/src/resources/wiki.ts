import axios from "axios";
import { useAuth } from "./auth";

export class Wiki {
  id?: string;
  imageUrl?: string;
  name?: string;
  description?: string;
  tags?: string;
  createdDate?: string;
}

export type WikiPage = {
  content: Wiki[];

  totalElements: number;
  number: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
};

export type WikiProps = {
  wiki: Wiki;
};

class WikiService {
  baseUrl: string = "http://localhost:8080/v1/wikis";
  auth = useAuth();

  async findWikis( pageNumber?: number, query?: string): Promise<WikiPage> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}?page=${pageNumber}&query=${query}&size=9`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async findWikiById(id?: string): Promise<Wiki> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}/${id}`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async saveWiki(data: FormData): Promise<string> {
    const userSession = this.auth.getUserSession();
    const response = await axios(this.baseUrl, {
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    return response.data;
  }
}

export const useWikiService = () => new WikiService();
