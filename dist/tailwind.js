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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
// import elementsArray from './elementTags';
const Provider_1 = require("./Provider");
// convert tailwind class name to css module class name
const convertToClassName = (styledmap, tailwind) => {
    let classList = '';
    styledmap?.forEach((item, index) => {
        if (index !== styledmap.length - 1) {
            classList += `${tailwind[item]} `;
        }
        else {
            classList += tailwind[item];
        }
        // console.log('item', tw[item]);
    });
    return classList;
};
// process styled map then return class name
const processStyledMap = (classList, sxProps, tailwind) => {
    const sxStyledList = convertToClassName(sxProps, tailwind);
    // console.log('sxProps', sxProps);
    // console.log('sxStyledList', sxStyledList);
    return classList && sxStyledList
        ? `${classList} ${sxStyledList}`
        : classList || sxStyledList || '';
};
// merge class name
const mergeOldClass = (oldClass, newClass) => {
    const oldClassString = oldClass ? oldClass : null;
    const newClassString = newClass ? newClass : null;
    // console.log('oldClassString', oldClassString);
    // console.log('newClassString', newClassString);
    return oldClassString ? `${oldClassString} ${newClassString}` : newClassString;
};
const processAll = ({ props, styledmap, tailwind }) => {
    const classList = styledmap ? convertToClassName(styledmap, tailwind) : '';
    // merge with sx
    const clacSxAndClassListResult = processStyledMap(classList, props?.sx, tailwind);
    const newProps = {
        ...props,
        // sx: null,
        className: mergeOldClass(props.className, clacSxAndClassListResult ? clacSxAndClassListResult : null),
    };
    return newProps;
};
const createStyled = (tag, styledmap) => {
    // console.log('styledmap', styledmap);
    const FinalTag = tag;
    // const FinalElement = Element
    // console.log('result classList', classList);
    const TailwindComponent = react_1.default.forwardRef((props, ref) => {
        const { tailwind } = (0, react_1.useContext)(Provider_1.TailwindStyledMapContext);
        if (tailwind) {
            // console.log(tailwind);
            const processAllPropsResult = processAll({ props, styledmap, tailwind });
            // console.log('processAllPropsResult', processAllPropsResult);
            return (react_1.default.createElement(FinalTag, { ...processAllPropsResult, ref: ref, 
                // remove old sx props
                sx: null }));
        }
        else {
            console.error(`You need to import TailwindCssModuleContext to use styled-map.`);
            console.error(`More info please vist: https://xxxxxx`);
            throw 'TailwindCssModuleProvider is not found';
        }
    });
    // This enables the react tree to show a name in devtools, much better debugging experience Note: Far from perfect, better implementations welcome
    if (typeof Element !== "string") {
        TailwindComponent.displayName = Element.displayName || Element.name || "tw.Component";
    }
    else {
        TailwindComponent.displayName = "tw." + Element;
    }
    return TailwindComponent;
};
exports.default = createStyled;
