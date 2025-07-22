import type { Route } from "@/interfaces";
import { lineString } from "@turf/turf";
import { BUHANGIN_VIA_JP_LAUREL } from "./routes";

export const routeOptions: Route[] = [
  {
    name: "Buhangin via JP Laurel (To Bajada)",
    route: lineString(BUHANGIN_VIA_JP_LAUREL.INBOUND),
    color: "red",
  },
  {
    name: "Buhangin via JP Laurel (To Buhangin)",
    route: lineString(BUHANGIN_VIA_JP_LAUREL.OUTBOUND),
    color: "blue",
  },
];
