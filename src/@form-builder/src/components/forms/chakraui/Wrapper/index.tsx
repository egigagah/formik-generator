import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    forwardRef,
    Stack,
} from "@chakra-ui/react";
import { memo } from "react";

export interface FormWrapperProps extends FormControlProps {
    error: any;
    helper?: string;
    hidden?: boolean;
}

const indexComponent = forwardRef<FormWrapperProps, "form">((props, ref) => {
    return (
        <FormControl
            as={Stack}
            {...ref}
            isInvalid={!!props.error?.[props.name as string]}
            isRequired={props.isRequired}
        >
            {!props.hidden && (
                <FormLabel htmlFor={props.id ?? props.name}>
                    {props.title}
                </FormLabel>
            )}
            {props.children}
            {!props.hidden && (
                <>
                    <FormHelperText>{props.helper}</FormHelperText>
                    <FormErrorMessage>
                        {props.error?.[props.name as string] as string}
                    </FormErrorMessage>
                </>
            )}
        </FormControl>
    );
});

const index = memo(indexComponent);

export default index;
