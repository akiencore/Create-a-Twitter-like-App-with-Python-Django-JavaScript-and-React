import { backendLookup } from "../lookup";

export function apiProfileDetail(username, callback) {
  backendLookup("GET", `/profiles/${username}/`, callback);
}

//new
export function apiProfileFollowToggle(username, action, callback) {
  const data = { action: `${action && action}`.toLowerCase() };
  backendLookup("POST", `/profiles/${username}/follow`, callback, data);
}
