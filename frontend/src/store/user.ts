import { toaster } from "@components/ui/toaster";
import { UserCreate, User, UserLogin, TokenData } from "@types";
import Request from "@services/request";
import { login } from "@services/auth";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

export interface UserStore {
  user: User | null;
  isSuperuser: () => boolean;
  checkToken: () => boolean;
  login: (loginData: UserLogin) => Promise<TokenData>;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set, get) => {
  return {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    isSuperuser: () => {
      const user = get().user;
      if (user) return user.role === "SUPERUSER";
      return false;
    },
    checkToken: () => {
      const token = localStorage.getItem("token");
      if (!token) return false;

      try {
        const decoded: { exp: number } = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
        return !isExpired;
      } catch {
        return false;
      }
    },
    login: async (loginData) => {
      const token = await login(loginData);
      window.localStorage.setItem("user", JSON.stringify(token.user));
      window.localStorage.setItem("token", token.accessToken);
      set({ user: token.user });
      return token;
    },
    logout: () => {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      set({ user: null });
    },
  };
});

export const useCreateUser = () => {
  return (user: UserCreate) => {
    const service = new Request("users");
    service
      .post<UserCreate, User>(user)
      .then(() => {
        toaster.create({
          title: "Usuario creado",
          description: `El usuario ha sido creado exitosamente`,
          type: "success",
          action: {
            label: "Cerrar",
            onClick: () => {
              toaster.dismiss();
            },
          },
        });
      })
      .catch((error) => {
        toaster.create({
          title: "Error",
          description: error.message,
          type: "error",
          action: {
            label: "Cerrar",
            onClick: () => {
              toaster.dismiss();
            },
          },
        });
      });
  };
};
