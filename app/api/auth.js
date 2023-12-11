import client from "./client";

const loginEndpoint = "/auth";

const registerEndpoint = "/users";

const login = (email, password) =>
  client.post(loginEndpoint, { email, password });

const register = (userInfo) => client.post(registerEndpoint, userInfo);

export default {
  login,
  register,
};
