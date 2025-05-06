import {
    createRootRoute,
    createRoute,
    createRouter,
    RouterProvider,
  } from "@tanstack/react-router";
  import Login from "../pages/Login";
  import Pokemon from "../pages/pokemon";
  import Weather from "../pages/wather";
  import { Outlet } from '@tanstack/react-router';
  const rootRoute = createRootRoute({
    component: () => <div><Outlet /></div>,
  });
  
  const loginRoute = createRoute({
    path: "/",
    getParentRoute: () => rootRoute,
    component: Login,
  });
  
  const pokemonRoute = createRoute({
    path: "/pokemon",
    getParentRoute: () => rootRoute,
    component: Pokemon,
  });
  
  const weatherRoute = createRoute({
    path: "/weather",
    getParentRoute: () => rootRoute,
    component: Weather,
  });
  
  const routeTree = rootRoute.addChildren([loginRoute, pokemonRoute, weatherRoute]);
  
  export const router = createRouter({ routeTree });
  
  export function AppRoutes() {
    return <RouterProvider router={router} />;
  }
  