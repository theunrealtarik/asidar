"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@material-tailwind/react");
const react_2 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const VideoCard = (props) => {
    const [isDownloading, update] = (0, react_2.useState)(true);
    (0, usehooks_ts_1.useInterval)(() => __awaiter(void 0, void 0, void 0, function* () {
        const isDownloading = yield window.api.peek(props.id);
        update(() => isDownloading);
    }), 300);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "inline-flex space-x-2 w-full" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "!w-48 !h-28 relative rounded overflow-hidden" }, { children: (0, jsx_runtime_1.jsx)("img", { src: props.thumbnail, className: "h-28 object-contain absolute bg-gray-200", decoding: "async", loading: "lazy" }, void 0) }), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex-1 overflow-hidden w-40 mt-4" }, { children: [(0, jsx_runtime_1.jsx)("h4", Object.assign({ className: "font-bold truncate" }, { children: props.title }), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "space-x-1" }, { children: [(0, jsx_runtime_1.jsx)(react_1.Chip, { value: props.format }, void 0), isDownloading && (0, jsx_runtime_1.jsx)(react_1.Chip, { value: "Downloading ...", color: "gray" }, void 0), !isDownloading && (0, jsx_runtime_1.jsx)(react_1.Chip, { value: "Downloaded", color: "green" }, void 0)] }), void 0)] }), void 0)] }), void 0));
};
exports.default = VideoCard;
//# sourceMappingURL=VideoCard.js.map