import axios, { AxiosResponse } from "axios";

export interface ResponseProps {
  success: boolean;
  data?: any;
  error?: any;
}

class ProfileService {
  private api: string | undefined;

  constructor() {
    this.api = process.env.EXPO_PUBLIC_API_URL;
  }

  async uploadImage(image: string): Promise<any> {
    try {
      if (!image) {
        return { success: false, error: "No image provided" };
      }
      const response: AxiosResponse<any, any, {}> = await axios.post(
        `${this.api}/profile/upload`,
        {
          image,
        }
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error uploading image:", error);
      return { success: false, error: error.message };
    }
  }
}

export default new ProfileService();
