import { FormsShapes, renderFormShape } from "@form-builder/src/types";
import { listFieldType } from "@form-builder/src/utils";

export const choiseFieldType =
    "multiselect,async-multiselect,select,select-string,async-select,radio,checkbox";

export const fieldData: renderFormShape[] = [
    {
        id: "name",
        default: "",
        name: "name",
        label: "name",
        type: "text",
        required: true,
        isDepend: false,
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"100%"}',
    },
    {
        id: "label",
        default: "",
        name: "label",
        label: "label",
        type: "text",
        required: true,
        isDepend: false,
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"100%"}',
    },
    {
        id: "type",
        default: "text",
        name: "type",
        label: "type",
        type: "select-string",
        listValue: listFieldType.join(","),
        required: true,
        isDepend: false,
        isAppend: false,
        isAffecting: true,
        affecting: [
            { other: "masking", action: "resetValue" },
            { other: "listValue", action: "resetValue" },
        ],
        errorMessage: "",
        style: '{"width":"100%"}',
    },
    {
        id: "masking",
        default: "",
        name: "masking",
        label: "Masking",
        type: "text",
        required: false,
        isDepend: true,
        isAppend: false,
        dependedRules: [
            {
                by: "type",
                condition: "in",
                value: "text,number,tel",
            },
        ],
        dependedAction: "show",
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"100%"}',
        helperMessage:
            "This expression will masking the input text; eg: '**-****-**'; * = alphanumeric; a: alphabeth; 9: numeric;",
    },
    {
        id: "listValue",
        default: "",
        name: "listValue",
        label: "List Value",
        type: "text",
        required: false,
        isDepend: true,
        dependedRules: [
            {
                by: "type",
                condition: "in",
                value: choiseFieldType,
            },
        ],
        dependedAction: "show",
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        helperMessage: "separate by comma without space",
        style: '{"width":"100%"}',
    },
];

export const mandatoryField: FormsShapes = {
    id: "form-fields-wrapper",
    active: true,
    as: "forms",
    title: "Field Data",
    noTitle: true,
    data: [...fieldData],
};

export const optionsField: renderFormShape[] = [
    {
        id: "default",
        default: undefined,
        name: "default",
        label: "Default",
        type: "text",
        required: false,
        isDepend: false,
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"100%"}',
        helperMessage: "This is default value for this field",
    },
    {
        id: "helperMessage",
        default: undefined,
        name: "helperMessage",
        label: "Helper Message",
        type: "textarea",
        required: false,
        isDepend: false,
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"100%"}',
        helperMessage: "This is helper Message for this field",
    },
    {
        id: "required",
        default: "",
        name: "required",
        label: "required",
        type: "boolean",
        required: true,
        isDepend: false,
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"100%"}',
    },
    {
        id: "errorMessage",
        default: "",
        name: "errorMessage",
        label: "Error Message",
        type: "textarea",
        required: false,
        isDepend: true,
        isAppend: false,
        dependedRules: [
            {
                by: "required",
                condition: "notEmpty",
                value: "",
            },
        ],
        dependedAction: "show",
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"100%"}',
        helperMessage: "This message will show on field is error",
    },
    {
        id: "isReadonly",
        default: "",
        name: "isReadonly",
        label: "readonly",
        type: "boolean",
        required: true,
        isDepend: false,
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"100%"}',
    },
    {
        id: "min",
        default: undefined,
        name: "min",
        label: "Min",
        type: "number",
        required: false,
        isDepend: true,
        dependedRules: [
            {
                by: "type",
                condition: "equal",
                value: "number",
            },
        ],
        dependedAction: "show",
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"50%"}',
        helperMessage: "This is min value for number type field",
    },
    {
        id: "max",
        default: undefined,
        name: "max",
        label: "Max",
        type: "number",
        required: false,
        isDepend: true,
        dependedRules: [
            {
                by: "type",
                condition: "equal",
                value: "number",
            },
        ],
        dependedAction: "show",
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"50%"}',
        helperMessage: "This is max value for number type field",
    },
    {
        id: "minLength",
        default: undefined,
        name: "minLength",
        label: "Min Length",
        type: "number",
        required: false,
        isDepend: true,
        dependedRules: [
            {
                by: "type",
                condition: "in",
                value: "text,textarea,email,password",
            },
        ],
        dependedAction: "show",
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"50%"}',
        helperMessage: "This is min value for number type field",
    },
    {
        id: "maxLength",
        default: undefined,
        name: "maxLength",
        label: "Max Length",
        type: "number",
        required: false,
        isDepend: true,
        dependedRules: [
            {
                by: "type",
                condition: "in",
                value: "text,textarea,email,password",
            },
        ],
        dependedAction: "show",
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"50%"}',
        helperMessage: "This is max value for number type field",
    },
    {
        id: "isDepend",
        default: "",
        name: "isDepend",
        label: "isDepend",
        type: "boolean",
        required: true,
        isDepend: false,
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"100%"}',
    },
    {
        default: "",
        id: "dependedRules",
        name: "dependedRules",
        label: "Depended Rules",
        type: "appendix",
        required: false,
        isDepend: true,
        dependedRules: [
            {
                by: "isDepend",
                condition: "notEmpty",
                value: "",
            },
        ],
        dependedAction: "show",
        isAppend: true,
        appendedData: [
            {
                id: "by",
                default: "",
                name: "by",
                label: "by",
                type: "text",
                required: true,
                isDepend: false,
                isAffecting: false,
                isAppend: false,
                errorMessage: "",
                style: '{"width":"100%"}',
            },
            {
                id: "condition",
                default: "",
                name: "condition",
                label: "condition",
                type: "select-string",
                listValue:
                    "greater,smaller,greaterOrEqual,smallerOrEqual,equal,notEqual,contain,notContain,notEmpty",
                required: true,
                isDepend: false,
                isAffecting: false,
                isAppend: false,
                errorMessage: "",
                style: '{"width":"100%"}',
            },
            {
                id: "value",
                default: "",
                name: "value",
                label: "value",
                type: "text",
                required: true,
                isDepend: false,
                isAffecting: false,
                isAppend: false,
                errorMessage: "",
                style: '{"width":"100%"}',
            },
        ],
        isAffecting: false,
        errorMessage: "Depended is Required",
        style: '{"width":"100%"}',
    },
    {
        default: "",
        id: "dependedAction",
        name: "dependedAction",
        label: "Depended Action",
        type: "select-string",
        listValue: "show,required,calculate,show-required",
        required: false,
        isDepend: true,
        dependedRules: [
            {
                by: "isDepend",
                condition: "notEmpty",
                value: "",
            },
        ],
        dependedAction: "show",
        isAppend: false,
        isAffecting: false,
        errorMessage: "Depended is Required",
        style: '{"width":"100%"}',
    },
    {
        id: "isAffecting",
        default: "",
        name: "isAffecting",
        label: "isAffecting",
        type: "boolean",
        required: true,
        isDepend: false,
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"100%"}',
    },
    {
        default: "",
        id: "affecting",
        name: "affecting",
        label: "affecting",
        type: "appendix",
        required: false,
        isDepend: true,
        dependedRules: [
            {
                by: "isAffecting",
                condition: "notEmpty",
                value: "",
            },
        ],
        dependedAction: "show",
        isAppend: true,
        appendedData: [
            {
                id: "other",
                default: "",
                name: "other",
                label: "other",
                type: "text",
                required: true,
                isDepend: false,
                isAffecting: false,
                isAppend: false,
                errorMessage: "",
                style: '{"width":"100%"}',
            },
            {
                id: "action",
                default: "",
                name: "action",
                label: "action",
                type: "select-string",
                listValue: "calculateDate,setValue,setValueCamelCase",
                required: true,
                isDepend: false,
                isAffecting: false,
                isAppend: false,
                errorMessage: "",
                style: '{"width":"100%"}',
            },
        ],
        isAffecting: false,
        errorMessage: "Depended is Required",
        style: '{"width":"100%"}',
    },
    {
        id: "isAppend",
        default: "",
        name: "isAppend",
        label: "isAppend",
        type: "boolean",
        required: true,
        isDepend: false,
        isAppend: false,
        isAffecting: false,
        errorMessage: "",
        style: '{"width":"100%"}',
    },
];

export const appendField: renderFormShape = {
    default: "",
    id: "appendedData",
    name: "appendedData",
    label: "Append Data",
    type: "appendix",
    required: false,
    isDepend: true,
    dependedRules: [
        {
            by: "isAppend",
            condition: "notEmpty",
            value: "",
        },
    ],
    dependedAction: "show",
    isAppend: true,
    appendedData: [...fieldData, ...optionsField],
    isAffecting: false,
    errorMessage: "Depended is Required",
    style: '{"width":"100%"}',
};

export const formField: FormsShapes = {
    id: "form-fields",
    active: true,
    as: "wrapper",
    title: "Form Fields",
    data: [
        {
            id: "form-fields-wizards",
            active: true,
            as: "wizards",
            title: "",
            noTitle: true,
            data: [
                { ...mandatoryField },
                {
                    id: "form-fields-accordion",
                    active: true,
                    as: "forms",
                    title: "Configuration",
                    noTitle: true,
                    data: [...optionsField, appendField],
                },
                {
                    id: "form-fields-style",
                    active: true,
                    as: "forms",
                    title: "Style",
                    noTitle: true,
                    data: [
                        {
                            id: "style",
                            default: '{"width":"100%"}',
                            name: "style",
                            label: "Style",
                            type: "code-editor",
                            required: false,
                            isDepend: false,
                            isAppend: false,
                            isAffecting: false,
                            errorMessage: "",
                            helperMessage: "Write a valid CSS code",
                            style: '{"width":"100%"}',
                        },
                    ],
                },
            ],
        },
    ],
};

export const formLayout: FormsShapes = {
    id: "form-layout",
    active: true,
    as: "forms",
    title: "Form Layout",
    data: [
        {
            default: "",
            id: "id",
            name: "id",
            label: "id",
            type: "hidden",
            required: false,
            isDepend: false,
            isAppend: false,
            isAffecting: false,
            errorMessage: "Title is Required",
            style: '{"width":"100%"}',
        },
        {
            default: "",
            id: "title",
            name: "title",
            label: "Title",
            type: "text",
            required: false,
            isDepend: false,
            isAppend: false,
            isAffecting: false,
            errorMessage: "Title is Required",
            helperMessage:
                "Let this one blank if u dont wanna show the title for layout, or just simply check / switch on Hide Title below.",
            style: '{"width":"100%"}',
        },
        {
            default: "wizards",
            id: "as",
            name: "as",
            label: "As",
            type: "select-string",
            listValue: "accordions,forms,wizards,wrapper",
            required: true,
            isDepend: false,
            isAppend: false,
            isAffecting: false,
            errorMessage: "As is Required",
            helperMessage:
                "Any of FIELD's node can only be part of children node of FORMS type layout.",
            style: '{"width":"100%"}',
        },
        {
            default: "",
            id: "refId",
            name: "refId",
            label: "Refference Id",
            type: "text",
            required: false,
            isDepend: false,
            isAppend: false,
            isAffecting: false,
            errorMessage: "Refference Id is Required",
            helperMessage:
                "If refid was not set and scheme is not null, then this layout will automatically append the root children. otherwise it will create new scheme",
            style: '{"width":"100%"}',
        },
        {
            id: "active",
            default: true,
            name: "active",
            label: "Active",
            type: "boolean",
            required: true,
            isDepend: false,
            isAppend: false,
            isAffecting: false,
            helperMessage: "only active node will be rendered",
            errorMessage: "",
        },
        {
            id: "noTitle",
            default: false,
            name: "noTitle",
            label: "Hide Title",
            type: "boolean",
            required: true,
            isDepend: false,
            isAppend: false,
            isAffecting: false,
            helperMessage: "switch on if u wanna hide the title",
            errorMessage: "",
        },
        {
            id: "isIndexing",
            default: false,
            name: "isIndexing",
            label: "With Index Number",
            type: "boolean",
            required: true,
            isDepend: false,
            isAppend: false,
            isAffecting: false,
            helperMessage: "Will wrap forms with index/order number",
            errorMessage: "",
        },
        {
            default: "",
            id: "data",
            name: "data",
            label: "data",
            type: "hidden-array",
            required: false,
            isDepend: false,
            isAppend: false,
            isAffecting: false,
            errorMessage: "",
            style: '{"width":"100%"}',
        },
    ],
};
