import createApiClient from "./api.service";

class AuthService {
    constructor(baseUrl = "/api/auth") {
        this.api = createApiClient(baseUrl);
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }

    async register(data) {
        return (await this.api.post("/register", data)).data;
    }

    async refresh() {
        return (await this.api.post("/refresh")).data;
    }
}
export default new AuthService();
