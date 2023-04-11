import React from "react";
import { Youtube, Clock } from "react-feather";

const ConvertView = React.lazy(() => import("./Download"));
const HistoryView = React.lazy(() => import("./History"));

const Views = [
  { icon: Youtube, component: ConvertView, label: "convert" },
  { icon: Clock, component: HistoryView, label: "history" },
];

export default Views;
