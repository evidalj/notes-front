import { Response } from "../interfaces/response";
import { axiosConfig } from "./api";
class NoteService {
  private static instance: NoteService;
  private path: string = "notes";
  public static getInstance() {
    if (!this.instance) {
      this.instance = new NoteService();
    }
    return this.instance;
  }

  async getNotes() {
    try {
      const response = await axiosConfig.get(this.path);
      return response.data as Response;
    } catch (error: any) {
      console.log(error);
    }
  }
}

export default NoteService;
