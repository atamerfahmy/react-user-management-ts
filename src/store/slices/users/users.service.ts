import apiClient from "../../../utils/apiClient";
import { fecthPagination } from "./users.actions";
const RESOURCE = "/user";

const fetchUsers = (payload: fecthPagination) => {
  return apiClient.get(RESOURCE + `?page=${payload.page}&limit=${payload.limit}`);
};

const deleteUser = (userId: string) => {
  return apiClient.delete(`${RESOURCE}/${userId}`);
};

const createUser = (payload: any) => {
  return apiClient.post(`${RESOURCE}/create`, {...payload});
};

const updateUser = (payload: any) => {
  return apiClient.put(`${RESOURCE}/${payload.id}`, payload);
};

export { fetchUsers, deleteUser, createUser, updateUser };
