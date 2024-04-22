import createApiClient from "./api.service";

class PublishingCompanyService {
    constructor(baseUrl = "/api/companies/") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async deleteAll() {
        return (await this.api.delete("/")).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async update(id, data) {
        return (await this.api.post(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new PublishingCompanyService();
