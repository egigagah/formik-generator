import {
    Box,
    Button,
    Center,
    Divider,
    HStack,
    IconButton,
    Stack,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import useFormContextBuilder from "@form-builder/src/hooks/useFormContextBuilder";
import useWindowSize from "@form-builder/src/hooks/useWindowSize";
import { FormsShapes, renderFormShape } from "@form-builder/src/types";
import {
    breakObjectReference,
    editObjectScheme,
    findObjectScheme,
    listFieldType,
} from "@form-builder/src/utils";
import { FormikHelpers } from "formik";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import ReactFocusLock from "react-focus-lock";
import { AiFillDelete } from "react-icons/ai";
import { PopoverConfirmation } from ".";
import DragnDropWrapper from "../dragndrop";
import RenderFormComponent from "../render";
import { formField, formLayout } from "./datas";

const Forms = (): JSX.Element => {
    const {
        scheme,
        selected,
        setScheme,
        setSelected,
        setEdit,
        editData,
        resetScheme,
    } = useFormContextBuilder<FormsShapes>();
    const [state, setState] = useState<string>("form-layouts");

    const onSubmitForm = (values: any, helper: FormikHelpers<any>) => {
        if (editData) editSubmission(values, helper);
        else {
            if (state === "form-layouts") submitLayouts(values, helper);
            else if (state === "form-fields") submitFields(values, helper);
        }
    };

    function submitLayouts(values: any, helper: FormikHelpers<any>) {
        const { resetForm, setFieldValue, validateForm } = helper;
        const data = breakObjectReference(values);
        data.id = nanoid(10);
        data.refId = selected?.id;

        if (data.refId) {
            const x = findObjectScheme(scheme, data.refId);
            x.data.push(breakObjectReference(data));
            setScheme(breakObjectReference(scheme));
        } else if (scheme) {
            const x = findObjectScheme(scheme, scheme?.id);
            x.data.push(breakObjectReference(data));
            setScheme(breakObjectReference(scheme));
        } else {
            setScheme(data);
        }
        resetForm();
        // setFieldValue("refId", data.id);
        validateForm();
        // setSelected(data);
    }

    function submitFields(values: any, helper: FormikHelpers<any>) {
        const { resetForm, validateForm } = helper;
        const data = breakObjectReference(values);
        data.id = nanoid(10);
        data.refId = selected?.id;
        if (selected && selected.id) {
            const x = findObjectScheme(scheme, selected.id);
            x.data.push(breakObjectReference(data));
            setScheme(breakObjectReference(scheme));
        } else {
            setScheme(data);
        }
        resetForm();
        validateForm();
    }

    function editSubmission(values: any, helper: FormikHelpers<any>) {
        const { resetForm, validateForm } = helper;
        const data = { ...values };
        const res = editObjectScheme(scheme, data);

        setScheme(res);
        resetForm();
        validateForm();
        setEdit(undefined);
    }

    useEffect(() => {
        if (selected && selected.as === "forms") setState("form-fields");
        else setState("form-layouts");
    }, [selected]);

    useEffect(() => {
        if (editData && !editData.as) setState("form-fields");
        else setState("form-layouts");
    }, [editData]);

    const refDiv = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState<number | string>("full");

    const size = useWindowSize();

    useEffect(() => {
        setHeight(size.height - (refDiv?.current?.offsetTop || 0));
    }, [size]);

    return (
        <HStack
            ref={refDiv}
            w="full"
            h={height}
            overflow="scroll"
            alignItems="start"
            px={4}
            rounded="xl"
        >
            <Stack
                justifyContent="start"
                alignItems="flex-start"
                maxW="max-content"
            >
                <Stack
                    flex={1}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    position="fixed"
                    left={0}
                    pt={16}
                >
                    <Button
                        size="sm"
                        colorScheme="teal"
                        variant="ghost"
                        disabled={state === "form-fields"}
                        isActive={state === "form-layout"}
                        onClick={() => setState("form-layouts")}
                    >
                        Layouts Form
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="teal"
                        variant="ghost"
                        disabled={
                            selected?.as !== "forms" && state !== "form-fields"
                        }
                        onClick={() => setState("form-fields")}
                        isActive={state === "form-fields"}
                    >
                        Fields Form
                    </Button>
                </Stack>
            </Stack>
            <Stack flex={1} py={8} bg="grey.100">
                <Center>
                    <Stack w="lg">
                        <Text pt={2} fontSize="sm">
                            This form layouts & fields is generated by Form
                            builder
                        </Text>
                        <Stack w="full">
                            <Box bg="white" px={4} rounded="2xl">
                                <ReactFocusLock>
                                    {state === "form-layouts" && (
                                        <RenderFormComponent
                                            formSchema={formLayout}
                                            initialValue={editData}
                                            showJson={true}
                                            onHandleSubmit={(d, helper) =>
                                                onSubmitForm(d, helper)
                                            }
                                        />
                                    )}
                                    {state === "form-fields" && (
                                        <RenderFormComponent
                                            formSchema={formField}
                                            initialValue={editData}
                                            showJson={true}
                                            onHandleSubmit={(d, helper) =>
                                                onSubmitForm(d, helper)
                                            }
                                        />
                                    )}
                                </ReactFocusLock>
                            </Box>
                        </Stack>
                    </Stack>
                </Center>
            </Stack>
            <Stack justifyContent="start" alignItems="flex-start" w="md">
                <Stack
                    width="md"
                    // position="sticky"
                    right={0}
                    flexDirection="row"
                    height="full"
                    bg="white"
                    overflow="scroll"
                >
                    <Stack flex={1}>
                        <HStack p={4} justifyContent="space-between">
                            <Text fontSize="xl" fontWeight="bold" mb={0}>
                                Component List
                            </Text>
                            {scheme && (
                                <Tooltip label="Delete All Scheme">
                                    <PopoverConfirmation
                                        action={() => resetScheme()}
                                        message="Are you sure to delete all scheme?"
                                    >
                                        <IconButton
                                            aria-label="delete-all"
                                            icon={<AiFillDelete size={15} />}
                                            variant="ghost"
                                            colorScheme="blackAlpha"
                                        />
                                    </PopoverConfirmation>
                                </Tooltip>
                            )}
                        </HStack>
                        <Divider />
                        <DragnDropWrapper
                            flex={1}
                            justifyContent="space-between"
                            alignItems="stretch"
                        />
                    </Stack>
                </Stack>
            </Stack>
        </HStack>
    );
};

export default Forms;
