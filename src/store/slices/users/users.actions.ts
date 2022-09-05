// import { AnyAction } from "@reduxjs/toolkit"
// import apiClient from "../../../utils/apiClient"
// import { AppDispatch, RootState } from "../../../store"
import { setUsers } from "./users.slice"
import { createUser, deleteUser, fetchUsers } from "./users.service";
import store from "../../store";

export function fetchUsersAction() {

    return function (dispatch: any, getState: any) {
        return fetchUsers().then(
          res => dispatch(setUsers(res.data)),
          // error => dispatch(decrement())
        )
    }
}

export function createUserAction(payload: any) {

  return function (dispatch: any, getState: any) {
      return createUser(payload).then(
        res => store.dispatch(fetchUsersAction()),
        // error => dispatch(decrement())
      )
  }
}

export function deleteUserAction(postId: any) {

  return function (dispatch: any, getState: any) {
      return deleteUser(postId).then(
        res => store.dispatch(fetchUsersAction()),
        // error => dispatch(decrement())
      )
  }
}