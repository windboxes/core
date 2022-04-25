"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TailwindCssModuleProvider = exports.TailwindCssModuleContext = void 0;
const tailwind_1 = __importDefault(require("./tailwind"));
exports.default = tailwind_1.default;
const Provider_1 = require("./Provider");
Object.defineProperty(exports, "TailwindCssModuleContext", { enumerable: true, get: function () { return Provider_1.TailwindCssModuleContext; } });
Object.defineProperty(exports, "TailwindCssModuleProvider", { enumerable: true, get: function () { return Provider_1.TailwindCssModuleProvider; } });
