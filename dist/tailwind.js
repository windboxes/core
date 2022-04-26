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
const react_1 = __importStar(require("react"));
const elementTags_1 = __importDefault(require("./elementTags"));
const Provider_1 = require("./Provider");
// convert tailwind class name to css module class name
const convertToClassName = (styledmap, tailwind) => {
    let classList = '';
    let styledMapArray = [];
    if (typeof styledmap === 'object') {
        styledMapArray = styledmap;
    }
    else if (typeof styledmap === 'string') {
        // console.log('string process engine');
        const splitString = styledmap.split(' ');
        styledMapArray = splitString;
    }
    // console.log('styledMapArray', styledMapArray);
    // filter undefined and empty element
    styledMapArray = styledMapArray.filter(item => item !== undefined && item !== 'undefined' && item !== '');
    styledMapArray?.forEach((item, index) => {
        if (tailwind[item] !== undefined) {
            if (index !== styledMapArray.length - 1 && styledMapArray.length !== 1) {
                classList += `${tailwind[item]} `;
            }
            else {
                classList += tailwind[item];
            }
            // console.log('item', tailwind[item]);
        }
    });
    // console.log('classList', classList);
    return classList;
};
// process styled map then return class name
const processSxStyledMapAndMerge = (classList, sxProps, tailwind) => {
    // console.log('classList', classList);
    // console.log('sxProps', sxProps);
    let newClassNameList = '';
    if (classList && classList !== 'undefined') {
        newClassNameList += classList;
    }
    const sxStyledList = convertToClassName(sxProps, tailwind);
    // console.log('sxStyledList', sxStyledList);
    if (newClassNameList.length > 0) {
        newClassNameList += ` ${sxStyledList}`;
    }
    else {
        newClassNameList += sxStyledList;
    }
    // console.log('newClassNameList', newClassNameList);
    return newClassNameList;
};
// merge class name
const mergeOldClass = (oldClass, newClass) => {
    const oldClassString = oldClass ? oldClass : null;
    const newClassString = newClass ? newClass : null;
    // console.log('oldClassString', oldClassString);
    // console.log('newClassString', newClassString);
    const result = oldClassString ? `${oldClassString} ${newClassString}` : newClassString;
    // console.log('result', result);
    return result;
};
const processAll = ({ props, styledmap, tailwind }) => {
    // console.log('sx props', props?.sx);
    // console.log('styledmap', styledmap);
    const classList = styledmap ? convertToClassName(styledmap, tailwind) : '';
    // merge with sx
    const clacSxAndClassListResult = processSxStyledMapAndMerge(classList, props?.sx, tailwind);
    // merge all class
    const mergeClassNameResult = mergeOldClass(props.className, clacSxAndClassListResult);
    const newProps = {
        ...props,
        // sx: null,
        className: mergeClassNameResult ? mergeClassNameResult : null,
    };
    return newProps;
};
const createStyled = (tag, styledmap) => {
    // console.log('styledmap', styledmap);
    const FinalTag = tag;
    // console.log('result classList', classList);
    const TailwindComponent = react_1.default.forwardRef((props, ref) => {
        const { tailwind } = (0, react_1.useContext)(Provider_1.TailwindStyledMapContext);
        // console.log(tailwind);
        if (tailwind) {
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
