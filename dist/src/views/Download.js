"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("../../constants");
const hooks_1 = require("../hooks");
const context_1 = require("../context");
const react_1 = require("jotai/react");
const react_hook_form_1 = require("react-hook-form");
const react_2 = require("@material-tailwind/react");
const react_3 = require("react");
function DownloadView() {
    const ffmpeg = (0, hooks_1.useFfmpeg)();
    const form = (0, react_hook_form_1.useForm)();
    const [loading, setLoading] = (0, react_3.useState)(false);
    const [history, setHistory] = (0, react_1.useAtom)(context_1.HistoryAtom);
    const submitHandler = (data) => {
        setLoading(true);
        window.api
            .request(data.url, data.format)
            .then((details) => {
            setHistory((prev) => {
                if (prev.find((video) => video.id === details.videoId))
                    return prev;
                return [
                    ...prev,
                    {
                        id: details.videoId,
                        length: details.lengthSeconds,
                        thumbnail: details.thumbnails[0].url,
                        title: details.title,
                        format: data.format,
                    },
                ];
            });
            form.reset();
        })
            .catch(() => alert("Try clicking download again ... 👀"))
            .finally(() => setLoading(false));
    };
    return ((0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: form.handleSubmit(submitHandler), className: "w-full h-full" }, { children: [(0, jsx_runtime_1.jsx)(react_2.Input, Object.assign({ label: "YouTube Video Link", className: "!w-full", color: form.formState.errors.url ? "red" : "blue", disabled: !ffmpeg.isInstalled || loading }, form.register("url", { required: true, pattern: constants_1.YouTubeURL })), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex gap-x-2 items-center w-full mt-4" }, { children: [(0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, Object.assign({ name: "format", control: form.control }, form.register("format", { required: true }), { render: ({ field }) => ((0, jsx_runtime_1.jsxs)(react_2.Select, Object.assign({ label: "Format", disabled: !ffmpeg.isInstalled || loading, color: form.formState.errors.format ? "red" : "blue" }, field, { children: [(0, jsx_runtime_1.jsx)(react_2.Option, Object.assign({ value: "mp4" }, { children: "Video (MP4)" }), void 0), (0, jsx_runtime_1.jsx)(react_2.Option, Object.assign({ value: "mp3" }, { children: "Audio (MP3)" }), void 0)] }), void 0)) }), void 0), (0, jsx_runtime_1.jsx)(react_2.Button, Object.assign({ type: "submit", className: "w-1/2", disabled: !ffmpeg.isInstalled || loading, color: !!form.formState.errors.url || !!form.formState.errors.format
                            ? "red"
                            : "blue" }, { children: "download" }), void 0)] }), void 0)] }), void 0));
}
exports.default = DownloadView;
const QUALITIES = [96, 128, 256, 320];
//# sourceMappingURL=Download.js.map