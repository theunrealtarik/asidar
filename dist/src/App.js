"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_2 = require("@material-tailwind/react");
const react_3 = require("@headlessui/react");
const views_1 = __importDefault(require("./views"));
const Labels_1 = __importDefault(require("./components/Labels"));
const App = () => {
    return ((0, jsx_runtime_1.jsx)("main", Object.assign({ className: "w-full h-screen" }, { children: (0, jsx_runtime_1.jsxs)(react_3.Tab.Group, Object.assign({ as: "aside", className: "w-full h-full" }, { children: [(0, jsx_runtime_1.jsxs)(react_3.Tab.List, Object.assign({ className: "fixed top-0 left-0 w-52 flex flex-col gap-y-2 p-2 h-full justify-between" }, { children: [(0, jsx_runtime_1.jsx)("div", { children: views_1.default.map((tab, index) => ((0, jsx_runtime_1.jsx)(react_3.Tab, Object.assign({ as: react_1.default.Fragment }, { children: ({ selected }) => ((0, jsx_runtime_1.jsxs)(react_2.Button, Object.assign({ variant: selected ? "filled" : "text", className: "inline-flex items-center space-x-2 w-full" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)(tab.icon, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)("span", { children: tab.label }, void 0)] }), void 0)) }), index))) }, void 0), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Labels_1.default.FFMPEG, {}, void 0) }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(react_3.Tab.Panels, Object.assign({ className: "ml-52" }, { children: views_1.default.map((tab, index) => ((0, jsx_runtime_1.jsx)(react_3.Tab.Panel, Object.assign({ className: "p-4 pl-2 w-full" }, { children: (0, jsx_runtime_1.jsx)(react_1.default.Suspense, Object.assign({ fallback: "Loading ..." }, { children: (0, jsx_runtime_1.jsx)(tab.component, {}, void 0) }), void 0) }), index))) }), void 0)] }), void 0) }), void 0));
};
exports.default = App;
//# sourceMappingURL=App.js.map