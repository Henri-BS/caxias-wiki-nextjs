import {AccessToken, Credentials, User, UserSessionToken } from "./user.resource";

class AuthService {
  baseUrl: string = "http://localhost:8080/v1/users";
  static AUTH_PARAM: string = "_auth";

  async authenticate(credentials: Credentials) : Promise<AccessToken> {
      const response = await fetch(this.baseUrl + "/auth", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
              "Content-Type": "application/json"
          }
      });

      if(response.status == 401){
          throw new Error("Usuários ou senha inválidos!");
      }

      return await response.json();
  }

  async save(user: User): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });

    console.log("Response: ", response);

    if (response.status == 409) {
      throw new Error("Usuário já existe!");
    }
  }

}

export const useAuth = () => new AuthService();
