"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TailwindCssModuleProvider = exports.TailwindCssModuleContext = void 0;
const react_1 = require("react");
const TailwindContext = (0, react_1.createContext)({
    tailwind: null,
});
exports.TailwindCssModuleContext = TailwindContext;
exports.TailwindCssModuleProvider = TailwindContext.Provider;
