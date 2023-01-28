import { renderFormShape } from "@form-builder/src/types";
import React, { Fragment } from "react";
import ReactSelect from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

export interface SelectComponentProps extends StateManagerProps {
    datas?: renderFormShape;
    formProps?: any;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
    datas,
    formProps,
    ...rest
}): JSX.Element => {
    return (
        <Fragment>
            {datas && (
                <ReactSelect
                    isMulti={datas.type === "multiselect"}
                    {...rest}
                ></ReactSelect>
            )}
        </Fragment>
    );
};

export default SelectComponent;
