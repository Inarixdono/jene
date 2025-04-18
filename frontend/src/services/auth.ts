import axios from "axios";
import { mapKeysTo } from "@utils/case-converter";
import { UserLogin, tokenData } from "@types";

export const login = async (loginData: UserLogin) => {
  const formData = new URLSearchParams();
  formData.append("username", loginData.username);
  formData.append("password", loginData.password);
  const response = await axios.post("/api/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return tokenData.parse(mapKeysTo(response.data));
};
