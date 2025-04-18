import axios from "axios";
import { camelToSnake, mapKeysTo } from "@utils/case-converter";

interface Headers {
  Authorization: string;
  [key: string]: string;
}

class Request {
  private baseUrl: string;
  private headers: Headers;

  constructor(resourceName: string) {
    this.baseUrl = `/api/${resourceName}/`;
    this.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  async get<T>(): Promise<[T]> {
    const response = await axios.get(this.baseUrl, {
      headers: this.headers,
    });
    return mapKeysTo(response.data);
  }

  async getOne<T>(id: number): Promise<T> {
    const response = await axios.get(`${this.baseUrl}${id}`, {
      headers: this.headers,
    });
    return mapKeysTo(response.data);
  }

  async post<T, P>(data: T): Promise<P | undefined> {
    const caseFixedData = mapKeysTo(data, camelToSnake);
    try {
      const response = await axios.post(this.baseUrl, caseFixedData, {
        headers: this.headers,
      });
      return mapKeysTo(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.detail);
      }
    }
  }

  async update<T>(data: T) {
    const caseFixedData = mapKeysTo(data, camelToSnake);
    const response = await axios.put(`${this.baseUrl}`, caseFixedData, {
      headers: this.headers,
    });
    return mapKeysTo(response.data);
  }
}

export default Request;
