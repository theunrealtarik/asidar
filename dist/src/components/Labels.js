"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_feather_1 = require("react-feather");
const hooks_1 = require("../hooks");
class Labels {
    static FFMPEG() {
        const ffmpeg = (0, hooks_1.useFfmpeg)();
        if (ffmpeg.isLoading) {
            return ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-4 bg-gray-300 animate-pulse rounded" }, void 0));
        }
        if (!ffmpeg.isInstalled) {
            return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "inline-flex items-center space-x-1 cursor-default" }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.X, { className: "p-1 bg-red-400 rounded-full", size: 20 }, void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-xs text-gray-800" }, { children: "FFmpeg is not installed" }), void 0)] }), void 0));
        }
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "inline-flex items-center space-x-1 cursor-default" }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.Check, { className: "p-1 bg-green-400 rounded-full", size: 20 }, void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-xs text-gray-800" }, { children: "FFmpeg is installed" }), void 0)] }), void 0));
    }
}
exports.default = Labels;
//# sourceMappingURL=Labels.js.map