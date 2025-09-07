import type { Route } from "@/interfaces";
import { create } from "zustand";

interface RouteStore {
  selectedRoutes: Route[];
  addRoute: (route: Route) => void;
  removeRoute: (route: Route) => void;
  clearRoutes: () => void;
}

export const useRouteStore = create<RouteStore>((set) => ({
  selectedRoutes: [],
  addRoute: (route: Route) =>
    set((state) => ({ selectedRoutes: [...state.selectedRoutes, route] })),
  removeRoute: (route: Route) =>
    set((state) => ({
      selectedRoutes: state.selectedRoutes.filter((r) => r.name !== route.name),
    })),
  clearRoutes: () => set({ selectedRoutes: [] }),
}));
