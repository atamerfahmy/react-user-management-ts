import apiClient from "../../../utils/apiClient";
const RESOURCE = "/user";

const fetchUsers = () => {
  return apiClient.get(RESOURCE);
};

const deleteUser = (postId: string) => {
  return apiClient.delete(`${RESOURCE}/${postId}`);
};

const createUser = (payload: any) => {
  return apiClient.post(`${RESOURCE}/create`, {...payload});
};

const fetchRelatedUsers = (userId: string) => {
  return apiClient.get(`${RESOURCE}?userId=${userId}`);
};

export { fetchUsers, deleteUser, createUser, fetchRelatedUsers };
