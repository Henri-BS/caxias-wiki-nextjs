import { AccessToken, Credentials, User, UserSessionToken } from "./user.resource";

class AuthService {
  baseUrl: string = "http://localhost:8080/v1/users";
static AUTH_PARAM: string = "auth";


  async authenticate(credentials: Credentials): Promise<AccessToken> {
    const response = await fetch(this.baseUrl + "/auth", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers:{
        "Content=Type": "application/json"
      }
    });
    if(response.status == 401){
      throw new Error("Usuário ou senha incorreta!")
    }
    return await response.json();
  }
}

export const useAuth = () => new AuthService();
