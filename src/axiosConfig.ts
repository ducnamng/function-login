import axios from "axios";
export const user = {
  username: "ducnamng",
  password: "ducnam123456",
};
const instance = axios.create({
  baseURL: "http://httpbin.org/basic-auth",
  auth: {
    username: user.username,
    password: user.password,
  },
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
