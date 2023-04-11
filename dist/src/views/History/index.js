"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("jotai/react");
const context_1 = require("../../context");
const VideoCard_1 = __importDefault(require("./VideoCard"));
function HistoryView() {
    const [history, setHistory] = (0, react_1.useAtom)(context_1.HistoryAtom);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex flex-col gap-y-2 w-full" }, { children: history.map((video) => ((0, jsx_runtime_1.jsx)(VideoCard_1.default, Object.assign({}, video), video.id))) }), void 0));
}
exports.default = HistoryView;
//# sourceMappingURL=index.js.map