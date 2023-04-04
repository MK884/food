import React from "react";
import axios from "axios";

import { useTranslate, useApiUrl, HttpError } from "@refinedev/core";

import { UseModalFormReturnType } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import { useAutocomplete, Edit } from "@refinedev/mui";

import {
    Drawer,
    FormControlLabel,
    Input,
    Radio,
    RadioGroup,
    TextField,
    Avatar,
    Typography,
    FormLabel,
    Stack,
    Box,
    IconButton,
    FormControl,
    OutlinedInput,
    InputAdornment,
    FormHelperText,
    Autocomplete,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { IProfile } from "interfaces/common";

export const EditProfile: React.FC<
    UseModalFormReturnType<IProfile, HttpError, IProfile>
> = ({
    watch,
    setValue,
    register,
    formState: { errors },
    control,
    refineCore: { onFinish },
    handleSubmit,
    modal: { visible, close },
    saveButtonProps,
    getValues,
}) => {
    const t = useTranslate();

    const apiUrl = useApiUrl();

    // const { autocompleteProps } = useAutocomplete<ICategory>({
    //     resource: "categories",
    // });

    const imageInput = watch("image");

    const onChangeHandler = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const formData = new FormData();

        const target = event.target;
        const file: File = (target.files as FileList)[0];

        formData.append("file", file);

        const res = await axios.post<{ url: string }>(
            `${apiUrl}/media/upload`,
            formData,
            {
                withCredentials: false,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            },
        );

        const { name, size, type, lastModified } = file;

        // eslint-disable-next-line
        const imagePaylod: any = [
            {
                name,
                size,
                type,
                lastModified,
                url: res.data.url,
            },
        ];

        setValue("image", imagePaylod, { shouldValidate: true });
    };

    return (
        <Drawer
            sx={{ zIndex: "1301" }}
            PaperProps={{ sx: { width: { sm: "100%", md: 500 } } }}
            open={visible}
            onClose={close}
            anchor="right"
        >
            <Edit
                saveButtonProps={saveButtonProps}
                headerProps={{
                    avatar: (
                        <IconButton
                            onClick={() => close()}
                            sx={{ width: "30px", height: "30px", mb: "5px" }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ),
                    action: null,
                }}
                wrapperProps={{ sx: { overflowY: "scroll", height: "100vh" } }}
            >
                <Stack>
                    <Box
                        justifyContent="center"
                        alignItems="center"
                        marginBottom="50px"
                        sx={{
                            paddingX: {
                                xs: 1,
                                md: 6,
                            },
                        }}
                    >
                        <form onSubmit={handleSubmit(onFinish)}>
                            <FormControl sx={{ width: "100%" }}>
                                <FormLabel required>
                                    {t("profile image")}
                                </FormLabel>
                                <Stack
                                    display="flex"
                                    alignItems="center"
                                    border="1px dashed  "
                                    borderColor="primary.main"
                                    borderRadius="5px"
                                    padding="10px"
                                    marginTop="5px"
                                >
                                    <label htmlFor="images-input">
                                        <Input
                                            id="images-input"
                                            type="file"
                                            sx={{
                                                display: "none",
                                            }}
                                            onChange={onChangeHandler}
                                        />
                                        <input
                                            id="file"
                                            {...register("image", {
                                                required: t(
                                                    "errors.required.field",
                                                    { field: "Image" },
                                                ),
                                            })}
                                            type="hidden"
                                        />
                                        <Avatar
                                            sx={{
                                                cursor: "pointer",
                                                width: {
                                                    xs: 100,
                                                    md: 180,
                                                },
                                                height: {
                                                    xs: 100,
                                                    md: 180,
                                                },
                                            }}
                                            src={
                                                imageInput && imageInput[0].url
                                            }
                                            alt="Store Location"
                                        />
                                    </label>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 800,
                                            marginTop: "8px",
                                        }}
                                    >
                                        {t(
                                            "products.fields.images.description",
                                        )}
                                    </Typography>
                                    <Typography style={{ fontSize: "12px" }}>
                                        {t("products.fields.images.validation")}
                                    </Typography>
                                </Stack>
                                {errors.image && (
                                    <FormHelperText error>
                                        {errors.image.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Stack gap="10px" marginTop="10px">
                                <FormControl>
                                    <FormLabel required>
                                        {t("username")}
                                    </FormLabel>
                                    <OutlinedInput
                                        id="name"
                                        {...register("name", {
                                            required: t(
                                                "errors.required.field",
                                                { field: "Name" },
                                            ),
                                        })}
                                        style={{ height: "40px" }}
                                    />
                                    {errors.name && (
                                        <FormHelperText error>
                                            {errors.name.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl>
                                    <FormLabel required>
                                        {t("address")}
                                    </FormLabel>
                                    <OutlinedInput
                                        id="address"
                                        {...register("address", {
                                            required: t(
                                                "errors.required.field",
                                                { field: "Description" },
                                            ),
                                        })}
                                        multiline
                                        minRows={5}
                                        maxRows={5}
                                    />
                                    {errors.address && (
                                        <FormHelperText error>
                                            {errors.address.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <Stack display="flex" flexDirection="row" gap={4}>

                                <FormControl>
                                    <FormLabel>
                                        {t('email')}
                                    </FormLabel>
                                    <OutlinedInput
                                        id="email"
                                        {...register("mail", {
                                            required: t(
                                                "error.required.field",
                                                { field: 'email' },
                                            ),
                                        })}
                                        type="email"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>
                                        {t('phone')}
                                    </FormLabel>
                                    <OutlinedInput
                                        id="phone"
                                        {...register("phone", {
                                            required: t(
                                                "error.required.field",
                                                { field: 'number' },
                                            ),
                                        })}
                                        type="number"
                                    />
                                </FormControl>
                               </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Edit>
        </Drawer>
    );
};
