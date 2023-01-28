// list collection types
export const inputStringTypeList = [
    "text",
    "email",
    "password",
    "tel",
    "textarea",
    "hidden",
];

export const inputSelectTypeList = ["multiselect", "select", "select-string"];
export const inputSelectAsyncTypeList = ["async-multiselect", "async-select"];
export const yupStringTypeList = ["text", "email", "password", "radio", "tel"];
export const yupNumberTypeList = ["tel", "number"];
export const yupDateTypeList = ["date", "datetime"];
export const yupSelectTypeList = [
    "multiselect",
    "async-multiselect",
    "select",
    "async-select",
];
export const yupObjectTypeList = ["hidden-object", ...yupSelectTypeList];
export const yupMultipleSelectTypeList = [
    "multiple-select",
    "multiple-select-async",
];

export const listDependedAction = [
    "show",
    "required",
    "calculate",
    "show-required",
];

export const listAffectingAction = [
    "calculateDate",
    "setValue",
    "setValueCamelCase",
    "resetValue",
];

export const listFieldType = [
    "appendix",
    "button",
    "checkbox",
    // "async-checkbox",
    "code-editor",
    "date",
    "datetime",
    "email",
    "boolean",
    "file",
    "hidden",
    "hidden-array",
    "hidden-object",
    "image",
    "month",
    "number",
    "password",
    "radio",
    // "async-radio",
    "range",
    "reset",
    "sign",
    "multiselect",
    "async-multiselect",
    "select",
    "select-string",
    "async-select",
    "submit",
    "tel",
    "text",
    "textarea",
    "time",
    "url",
];

export const listLogicalType = [
    { text: "greater", value: "greater", desc: "" },
    { text: "smaller", value: "smaller", desc: "" },
    { text: "greater or equal", value: "greaterOrEqual", desc: "" },
    { text: "smaller or equal", value: "smallerOrEqual", desc: "" },
    { text: "equal", value: "equal", desc: "" },
    { text: "not equal", value: "notEqual", desc: "" },
    { text: "contain", value: "contain", desc: "" },
    { text: "not contain", value: "notContain", desc: "" },
    { text: "not empty", value: "notEmpty", desc: "" },
    { text: "in", value: "in", desc: "" },
    { text: "not in", value: "notIn", desc: "" },
];
