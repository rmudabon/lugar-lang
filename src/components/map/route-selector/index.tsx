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
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const RouteSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedRoutes, addRoute, removeRoute } = useRouteStore();

  const toggleRoute = (route: Route) => {
    if (selectedRoutes.findIndex((r) => r.name === route.name) !== -1) {
      removeRoute(route);
    } else {
      addRoute(route);
    }
  };

  const filteredRoutes = routeOptions.filter((route) =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white shadow-md p-3 min-w-80 m-3 rounded-md"
    >
      <div className="flex justify-between gap-4 items-center">
        <Input
          autoFocus
          className="border-none shadow-none"
          placeholder="Search routes"
          value={searchTerm}
          onClick={() => setIsOpen(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon">
            <ChevronsUpDown className="w-4 h-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="max-h-64 overflow-y-auto flex flex-col gap-2 mt-3 mb-2">
        {filteredRoutes.map((route) => {
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
