import { forwardRef, useEffect, useState } from "react";
import ReactSelect, { GroupBase, OptionsOrGroups, Props } from "react-select";
import AsyncSelect from "react-select/async";
import { WrapperFields } from "..";

export interface SelectComponentProps extends Props {
    title: string;
    name: string;
    error: any;
    helper?: string;
    isRequired?: boolean;
    returnString?: boolean;
    isAsync?: boolean;
    loadOptions?: (
        inputValue: string,
        callback: (options: OptionsOrGroups<any, GroupBase<unknown>>) => void,
    ) => void | Promise<OptionsOrGroups<any, GroupBase<unknown>>>;
}

const index = forwardRef<Props, SelectComponentProps>((props, ref) => {
    const [state, setState] = useState<any>(undefined as any);
    useEffect(() => {
        if (typeof props.value === "string") {
            const val = props.options?.filter(
                (x: any) => x.value === props.value,
            )[0];
            setState(val);
        }
    }, [props.value]);

    return (
        <WrapperFields
            title={props.title}
            name={props.name}
            error={props.error}
            helper={props.helper}
            isRequired={props.isRequired ?? false}
        >
            {!props.isAsync && (
                <ReactSelect
                    {...props}
                    {...ref}
                    value={props.returnString ? state : props.value}
                />
            )}
            {props.isAsync && (
                <AsyncSelect
                    {...props}
                    {...ref}
                    defaultOptions={[""]}
                    value={props.returnString ? state : props.value}
                />
            )}
        </WrapperFields>
    );
});

export default index;
