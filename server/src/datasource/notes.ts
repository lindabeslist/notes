import { RESTDataSource } from '@apollo/datasource-rest';
import {Note, NotesRequest} from "./notes.interface";

class NotesAPI extends RESTDataSource {
    // override baseURL = 'http://localhost:8080/api/v1/notes';

    async getNotes({ page, page_size}: NotesRequest): Promise<Note[]> {
        // return this.get(`page${page}&page_size=${page_size}`);
        return this.get('http://localhost:8080/api/v1/notes?page=1&page_size=10')
    }
}
export default NotesAPI;
