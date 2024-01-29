import { NoteInterface } from "../interfaces/notes";
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
  async addNote(note: NoteInterface) {
    try {
      const response = await axiosConfig.post(this.path, note);
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
  async deleteNote(note: NoteInterface) {
    try {
      const response = await axiosConfig.delete(`${this.path}/${note.id}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
  async updateNote(note: NoteInterface) {
    try {
      const response = await axiosConfig.put(`${this.path}/${note.id}`, note);
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
}

export default NoteService;
