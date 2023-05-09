import axios from "../utils/config/axios.config";
/**
 * Login method
 * @param {string} email
 * @param {string} password
 * @returns
 */
export const login = (email: string, password: string) => {
  // declare body to POST
  let body = {
    email: email,
    password: password,
  };

  // send POST login request endpoint
  // http://localhost:8000/api/auth/login
  return axios.post("/auth/login", body);
};

/**
 * Register method
 * @param {string} email
 * @param {string} password
 * @param {string} name
 * @param {number} age
 * @returns
 */
export const register = (
  email: string,
  password: string,
  name: string,
  age: number
) => {
  // declare body to POST
  let body = {
    email: email,
    name: name,
    age: age,
    password: password,
  };

  // send POST register request endpoint
  // http://localhost:8000/api/auth/register
  return axios.post("/auth/register", body);
};
