"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TailwindStyledMapProvider = exports.TailwindStyledMapContext = void 0;
const react_1 = require("react");
const TailwindContext = (0, react_1.createContext)({
    tailwind: null,
});
// TailwindCssModuleContext
exports.TailwindStyledMapContext = TailwindContext;
exports.TailwindStyledMapProvider = TailwindContext.Provider;
