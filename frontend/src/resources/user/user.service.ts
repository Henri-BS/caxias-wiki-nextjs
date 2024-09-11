import {
  AccessToken,
  Credentials,
  User,
  UserSessionToken,
} from "./user.resource";
import jwt from "jwt-decode";

class AuthService {
  baseUrl: string = "http://localhost:8080/v1/users";
  static AUTH_PARAM: string = "_auth";

  async authenticate(credentials: Credentials): Promise<AccessToken> {
    const response = await fetch(this.baseUrl + "/auth", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response: ", response);

    if (response.status == 401) {
      throw new Error("Email ou senha inválidos!");
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
  initSession(token: AccessToken) {
    if (token.accessToken) {
      const decodedToken: any = jwt(token.accessToken);
      const userSessiontoken: UserSessionToken = {
        accessToken: token.accessToken,
        email: decodedToken.sub,
        name: decodedToken.name,
        expiration: decodedToken.exp,
      };
      this.setUserSession(userSessiontoken);
    }
  }
  setUserSession(userSessionToken: UserSessionToken) {
    try {
      localStorage.setItem(
        AuthService.AUTH_PARAM,
        JSON.stringify(userSessionToken)
      );
    } catch (error) {}
  }
  getUserSession(): UserSessionToken | null {
    try {
      const authString = localStorage.getItem(AuthService.AUTH_PARAM);
      if (!authString) {
        return null;
      }
      const token: UserSessionToken = JSON.parse(authString);
      return token;
    } catch (error) {
      return null;
    }
  }

  isSessionValid(): boolean {
    const userSession: UserSessionToken | null = this.getUserSession();
    if (!userSession) {
      return false;
    }
    const expiration: number | undefined = userSession.expiration;
    if (expiration) {
      const expirationDateInMillis = expiration * 1000;
      console.log("Data da expiração: ", new Date(expiration));
      return new Date() < new Date(expirationDateInMillis);
    }

    return false;
  }

  invalidateSession(): void {
    try {
      localStorage.removeItem(AuthService.AUTH_PARAM);
    } catch (error) {}
  }
}

export const useAuth = () => new AuthService();
