import { BASE_URL } from "../../constants/BASE_URL";
import axios from "axios";

export const checkLoggedIn = async () => {
  // check if user is logged in or not
  try {
    const temp = axios.get(`${BASE_URL}/auth/checkLogin`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const res = await temp;
    return Promise.resolve({ status: 200, data: res.data });
  } catch (error) {
    return Promise.resolve({ status: 401, data: error });
  }
};

export const Login = async (email: string, password: string) => {
  try {
    const temp = axios.post(
      `${BASE_URL}/auth/login`,
      { email: email, password: password },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const res = await temp;
    return Promise.resolve({ status: 200, data: res.data });
  } catch (error) {
    return Promise.resolve({ status: 401, data: error });
  }
};

export const getAllProjects = async () => {
  // check if user is logged in or not
  try {
    const temp = axios.get(`${BASE_URL}/service/getAllProjects`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const res = await temp;
    return Promise.resolve({ status: 200, data: res.data });
  } catch (error) {
    return Promise.resolve({ status: 401, data: error });
  }
};

export const getAllServices = async (projectId: string) => {
  // check if user is logged in or not
  try {
    const temp = axios.post(
      `${BASE_URL}/service/getAllServices`,
      { projectId: projectId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const res = await temp;
    return Promise.resolve({ status: 200, data: res.data });
  } catch (error) {
    return Promise.resolve({ status: 401, data: error });
  }
};

export const createProject = async (projectName: string) => {
  try {
    const temp = axios.post(
      `${BASE_URL}/service/createProject`,
      { name: projectName },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const res = await temp;
    return Promise.resolve({ status: 200, data: res.data });
  } catch (error) {
    return Promise.resolve({ status: 401, data: error });
  }
};

export const createService = async (
  serviceName: string,
  url: string,
  projectId: string
) => {
  try {
    const temp = axios.post(
      `${BASE_URL}/service/createService`,
      { serviceName: serviceName, url: url, projectId: projectId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const res = await temp;
    return Promise.resolve({ status: 200, data: res.data });
  } catch (error) {
    return Promise.resolve({ status: 401, data: error });
  }
};

export const getServiceById = async (id: string) => {
  try {
    const temp = axios.get(`${BASE_URL}/service/getService/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const res = await temp;
    return Promise.resolve({ status: 200, data: res.data });
  } catch (error) {
    return Promise.resolve({ status: 401, data: error });
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const temp = axios.delete(
      `${BASE_URL}/service/deleteProject/${projectId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const res = await temp;
    return Promise.resolve({ status: 200, data: res.data });
  } catch (error) {
    return Promise.resolve({ status: 401, data: error });
  }
};

export const deleteService = async (serviceId: string, projectId: string) => {
  try {
    const temp = axios.delete(
      `${BASE_URL}/service/deleteService/${serviceId}/${projectId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const res = await temp;
    return Promise.resolve({ status: 200, data: res.data });
  } catch (error) {
    return Promise.resolve({ status: 401, data: error });
  }
};

export const getUser = async () => {
  try {
    const temp = axios.get(`${BASE_URL}/user/getUser`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const res = await temp;
    return Promise.resolve({ status: 200, data: res.data });
  } catch (error) {
    return Promise.resolve({ status: 401, data: error });
  }
};
