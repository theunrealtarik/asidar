"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFfmpeg = void 0;
const react_1 = require("react");
function useFfmpeg() {
    const [state, dispatch] = (0, react_1.useReducer)((prev, curr) => (Object.assign(Object.assign({}, prev), curr)), {});
    (0, react_1.useEffect)(() => {
        dispatch({ isLoading: true });
        window.api
            .isFfmpegInstalled()
            .then((installed) => dispatch({ isInstalled: installed }))
            .catch(() => dispatch({ isInstalled: false, isError: true }))
            .finally(() => dispatch({ isLoading: false }));
    }, []);
    return state;
}
exports.useFfmpeg = useFfmpeg;
//# sourceMappingURL=index.js.map