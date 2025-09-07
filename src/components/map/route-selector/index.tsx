import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouteStore } from "@/lib/store";
import { routeOptions } from "@/constants/options";
import type { Route } from "@/interfaces";

export const RouteSelector = () => {
  const { selectedRoutes, addRoute, removeRoute } = useRouteStore();

  const toggleRoute = (route: Route) => {
    if (selectedRoutes.findIndex((r) => r.name === route.name) !== -1) {
      removeRoute(route);
    } else {
      addRoute(route);
    }
  };

  return (
    <Collapsible className="bg-white shadow-md p-3 min-w-72 m-3 rounded-md">
      <div className="flex justify-between gap-4 items-center">
        <h4 className="text-base font-medium">Routes</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon">
            <ChevronsUpDown className="w-4 h-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="max-h-64 overflow-y-auto flex flex-col gap-2 my-2">
        {routeOptions.map((route) => {
          const isSelected = selectedRoutes.find(
            (selectedRoute) => selectedRoute.name === route.name
          );
          return (
            <Button
              key={route.name}
              variant="ghost"
              onClick={() => {
                toggleRoute(route);
              }}
              className="justify-between font-normal items-center"
            >
              {route.name}
              {isSelected && <Check className="w-4 h-4 text-green-600" />}
            </Button>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};
