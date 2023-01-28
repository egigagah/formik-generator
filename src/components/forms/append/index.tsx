import { Button, Stack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export type childrenAppendComponentType = {
    data: any;
    index: number;
    dispatch: Dispatch<SetStateAction<any[]>>;
};

export interface AppendComponentProps {
    onHandleAdd: () => any[];
    children({
        data,
        index,
        dispatch,
    }: childrenAppendComponentType): React.ReactNode;
    item: any[];
    addTitle?: string;
}

const AppendComponent: React.FC<AppendComponentProps> = ({
    children,
    onHandleAdd,
    item,
    addTitle,
}): JSX.Element => {
    const [state, setState] = useState(item ?? []);

    useEffect(() => {
        setState(item);
    }, [item]);

    return (
        <Stack>
            {state &&
                state.map((depen, idx) =>
                    children({ data: depen, index: idx, dispatch: setState }),
                )}
            <Button
                colorScheme="facebook"
                onClick={() => setState(onHandleAdd())}
                variant="outline"
            >
                {addTitle ?? "Add More"}
            </Button>
        </Stack>
    );
};

export default AppendComponent;
