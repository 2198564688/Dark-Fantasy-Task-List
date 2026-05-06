import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Dungeon } from "./pages/Dungeon";
import { Journal } from "./pages/Journal";
import { WidgetView } from "./pages/WidgetView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dungeon },
      { path: "journal", Component: Journal },
      { path: "widget", Component: WidgetView },
    ],
  },
]);