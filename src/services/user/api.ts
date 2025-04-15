export const API_ROUTE = {
  CREATE_USER: "/user/create",
  GET_ALL_USERS: "/user/getAllUsers",
  GET_ALL_CATEGORY: "/user/getAllCategories",
  GET_ALL_PERMISSIONS: "/user/getallpermissionbycategory",
  GET_USER_BY_ID: "/user/getUser/:id",
  CHANGE_USER_STATUS: "/user/changeUserStatus/:id", //post
  UPDATE_USER: "/user/update",
  GET_PERMISSION_BY_ID: "/user/getAllPermissionsByCategory/:id",
  GET_USER_DATA_BY_CATEGORY_ID: "/user/getUsersByCategoryId/{id}",
  GET_USERS_DATA_BY_ID: "/user/getUser/:id",
};
