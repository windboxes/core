"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TailwindStyledMapProvider = exports.TailwindStyledMapContext = void 0;
const tailwind_1 = __importDefault(require("./tailwind"));
exports.default = tailwind_1.default;
const Provider_1 = require("./Provider");
Object.defineProperty(exports, "TailwindStyledMapContext", { enumerable: true, get: function () { return Provider_1.TailwindStyledMapContext; } });
Object.defineProperty(exports, "TailwindStyledMapProvider", { enumerable: true, get: function () { return Provider_1.TailwindStyledMapProvider; } });
