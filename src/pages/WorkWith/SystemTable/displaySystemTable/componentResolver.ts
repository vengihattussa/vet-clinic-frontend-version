// utils/componentResolver.ts

import {CategoryID, COMPONENT_REGISTRY} from "./componentRegistry";

export function resolveComponent(categoryId: CategoryID) {
  return COMPONENT_REGISTRY[categoryId] ?? "not found";
}
