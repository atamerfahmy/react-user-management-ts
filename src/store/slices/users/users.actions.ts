// import { AnyAction } from "@reduxjs/toolkit"
// import apiClient from "../../../utils/apiClient"
// import { AppDispatch, RootState } from "../../../store"
import { setUsers } from "./users.slice"
import { createUser, deleteUser, fetchUsers, updateUser } from "./users.service";
import store from "../../store";

export interface fecthPagination {
  page: number;
  limit: number;
}

export function fetchUsersAction(payload: fecthPagination) {

    return function (dispatch: any, getState: any) {
        return fetchUsers(payload).then(
          res => dispatch(setUsers(res.data)),
          // error => dispatch(decrement())
        )
    }
}

export function createUserAction(payload: any) {

  return function (dispatch: any, getState: any) {
      return createUser(payload).then(
        res => store.dispatch(fetchUsersAction({ page: 0, limit: 25 })),
        error => alert("Something went wrong! \n" + error.message)
      )
  }
}

export function deleteUserAction(payload: any) {

  return function (dispatch: any, getState: any) {
      return deleteUser(payload).then(
        res => store.dispatch(fetchUsersAction({ page: 0, limit: 25 })),
        // error => dispatch(decrement())
      )
  }
}

export function updateUserAction(payload: any) {

  return function (dispatch: any, getState: any) {
      return updateUser(payload).then(
        res => store.dispatch(fetchUsersAction({ page: 0, limit: 25 })),
        // error => dispatch(decrement())
      )
  }
}