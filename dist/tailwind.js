"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanTemplate = void 0;
const react_1 = __importStar(require("react"));
const elementTags_1 = __importDefault(require("./elementTags"));
const Provider_1 = require("./Provider");
const tailwind_merge_1 = require("tailwind-merge");
const cleanTemplate = (template) => {
    const newClasses = template
        .join(" ")
        .trim()
        .replace(/\n/g, " ") // replace newline with space
        .replace(/\s{2,}/g, " ") // replace line return by space
        .split(" ")
        .filter((c) => c !== ","); // remove comma introduced by template to string
    return newClasses;
};
exports.cleanTemplate = cleanTemplate;
// convert tailwind class name to css module class name
const convertToClassNameArrays = (styledmap, tailwind) => {
    let classList = [];
    let styledMapArray = [];
    // check is array
    if (typeof styledmap === 'object') {
        styledMapArray = styledmap;
        // console.log(styledMapArray);
    }
    else if (typeof styledmap === 'string') {
        // console.log('string process engine');
        const splitString = styledmap.split(' ');
        styledMapArray = splitString;
    }
    // console.log('styledMapArray', styledMapArray);
    styledMapArray.forEach((item) => {
        if (tailwind[item] !== undefined) {
            classList.push(tailwind[item]);
            // console.log('item', tailwind[item]);
        }
    });
    // console.log('classList', classList);
    return classList;
};
// create styled component
const createStyled = (Element, styledmap) => {
    // console.log('Element', Element)
    // console.log('styledmap', styledmap);
    const TailwindCssModuleComponent = react_1.default.forwardRef(({ as, ...props }, ref) => {
        const { tailwind } = (0, react_1.useContext)(Provider_1.TailwindStyledMapContext);
        const FinalElement = as || Element;
        if (tailwind) {
            // cache class map
            let styledMapArrays = [];
            if (styledmap !== undefined) {
                if (typeof styledmap === 'string') {
                    styledMapArrays = convertToClassNameArrays((0, exports.cleanTemplate)([styledmap]), tailwind);
                }
                else {
                    styledMapArrays = convertToClassNameArrays(styledmap, tailwind);
                }
                // console.log('styledMapArrays', styledMapArrays);
            }
            let sxStyledListArrays = [];
            // sx props
            if (typeof props.sx === 'string') {
                sxStyledListArrays = convertToClassNameArrays((0, exports.cleanTemplate)([props.sx]), tailwind);
            }
            else {
                sxStyledListArrays = convertToClassNameArrays(props.sx, tailwind);
            }
            // merge sx and styled map
            const mergeAllStyleArrays = styledMapArrays.concat(sxStyledListArrays);
            // console.log('mergeAllStyleArrays', mergeAllStyleArrays);
            // remove processed props
            const filterProps = Object.fromEntries(Object.entries(props).filter(([key]) => !key.includes('sx') && !key.includes('as')));
            return (react_1.default.createElement(FinalElement, { className: (0, tailwind_merge_1.twMerge)(...mergeAllStyleArrays, props.className), ref: ref, ...filterProps }));
        }
        else {
            console.error(`You need to import TailwindCssModuleContext to use styled-map.`);
            console.error(`More info vist: https://github.com/SnowFireWolf/tailwind-styled-map`);
            throw 'TailwindCssModuleProvider is not found';
        }
    });
    return TailwindCssModuleComponent;
};
const tagFunctions = elementTags_1.default.reduce((acc, item) => ({
    ...acc,
    [item]: (styledMap) => {
        return createStyled(item, styledMap);
    },
}), {});
// console.log('tagFunctions', tagFunctions);
// merge
const styleTailwind = Object.assign(createStyled, tagFunctions);
exports.default = styleTailwind;
