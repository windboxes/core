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
let calcStart = 0;
const Provider_1 = require("./Provider");
const createStyled = (tag, styledmap) => {
    const tw = (0, react_1.useContext)(Provider_1.TailwindCssModuleContext);
    // console.log('styledmap', styledmap);
    // process styled map then return class name
    const processStyledMap = (classList, sxProps) => {
        let sxStyledList = '';
        sxProps?.forEach((item, index) => {
            if (index !== sxProps.length - 1) {
                sxStyledList += `${tw[item]} `;
            }
            else {
                sxStyledList += tw[item];
            }
        });
        // console.log('sxProps', sxProps);
        // console.log('sxStyledList', sxStyledList);
        return classList ? `${classList} ${sxStyledList}` : sxStyledList;
    };
    // merge class name
    const mergeOldClass = (oldClass, newClass) => {
        const oldClassString = oldClass ? oldClass : null;
        const newClassString = newClass ? newClass : null;
        // console.log('oldClassString', oldClassString);
        // console.log('newClassString', newClassString);
        return oldClassString ? `${oldClassString} ${newClassString}` : newClassString;
    };
    const FinalTag = tag;
    let classList = '';
    styledmap?.forEach((item, index) => {
        if (index !== styledmap.length - 1) {
            classList += `${tw[item]} `;
        }
        else {
            classList += tw[item];
        }
        // console.log('item', tw[item]);
    });
    // console.log('result classList', classList);
    return react_1.default.forwardRef((props, ref) => {
        const clacSxAndClassListResult = processStyledMap(classList, props?.sx);
        // remove sx props
        const newProps = {
            ...props,
            // sx: null,
            className: mergeOldClass(props.className, clacSxAndClassListResult ? clacSxAndClassListResult : null),
        };
        return (react_1.default.createElement(FinalTag, { ...newProps, ref: ref, sx: null }));
    });
};
exports.default = createStyled;
