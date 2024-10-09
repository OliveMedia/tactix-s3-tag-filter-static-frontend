import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
  if (!token) return true;
  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken?.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
