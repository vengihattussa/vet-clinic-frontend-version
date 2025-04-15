export const API_ROUTE = {
  POST_CLIENT_REGISTRATION: "/api/vetClinic/client/addClient",
  GET_CLIENT: "/api/vetClinic/client/getClient/{id}",
  SEARCH_CLIENT: "/api/vetClinic/client/searchClient",
  UPDATE_CLIENT: "/api/vetClinic/client/updateClient",
  GET_CLIENT_NAME: "/api/vetClinic/client/getClientNameById/{id}",
  GET_STATE_BY_ZIP: "/api/vetClinic/client/states/zip",
} as const;
