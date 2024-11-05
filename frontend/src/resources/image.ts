import axios from "axios";
import { useAuth } from "./auth";
import { Wiki } from "./wiki";

export class Image {
  id?: string;
  url?: string;
  name?: string;
  notes?: string;
  extension?: string;
  size?: number;
  uploadDate?: string;
}


export type ImagePage = {
  content: Image[];

  totalElements: number;
  number: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
};


export type ImageProps = {
  image: Image;
};

class ImageService {
  baseUrl: string = "http://localhost:8080/v1/images";
  auth = useAuth();

  async findImagesByWiki(wikiId?: Wiki, pageNumber?: number, query?: string ): Promise<ImagePage> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseUrl}?wikiId=${wikiId}&pageNumber=${pageNumber}&query=${query}&size=6`;
    const response = axios(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const resp = await response;
    return resp.data;
  }

  async saveImage(data: FormData): Promise<string> {
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

export const useImageService = () => new ImageService();
