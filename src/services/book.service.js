import createApiClient from "./api.service";

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};

class BookService {
    constructor(baseUrl = "/api/books") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }

    async create(data) {
        return (await this.api.post("/", data, config)).data;
    }

    async deleteAll() {
        return (await this.api.delete("/")).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data, config)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async getNew(size = 10) {
        const res = await this.api.get(`/new?size=${size}`).data;
        return res;
    }
}
export default new BookService();
