import { ClickAwayListener, Dialog, DialogActions, DialogContent, DialogProps, Stack, TextField, useTheme } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useRef } from "react";
import { MainButton } from "../../../components/ui/MainButton";
import { Course } from "../../../types/course";

interface Props extends DialogProps {
    course?: Course
    closeDialog: () => void
    confirm?: (reason: string) => void
}
export function EditCourseRequestDialog(props: Props) {
    const theme = useTheme()
    const reasonRef = useRef<any>(null)
    const submitFunc = () => {
        const value: string = reasonRef.current.value
        console.log(reasonRef.current)
        if (!value) {
            enqueueSnackbar('يرجى تقديم سبب التغيير', { variant: 'error' })
            return
        }

        //@ts-ignore
        props.confirm?.(value)
    }

    return (
        <Dialog
            {...props}
        >
            <ClickAwayListener onClickAway={props.closeDialog}>
                <DialogContent>
                    <>
                        <Stack gap={2}>
                            <TextField
                                color={'secondary'}
                                inputRef={reasonRef}
                                multiline
                                minRows={3}
                                sx={{
                                    minWidth: '25dvw'
                                }}
                            />
                            <Stack
                                direction="row"
                                gap={2}
                                justifyContent={'flex-end'}
                            >
                                <MainButton
                                    color={theme.palette.error.main}
                                    onClick={props.closeDialog}
                                    variant={'contained'}
                                    text={"إلغاء"}
                                />
                                <MainButton
                                    color={theme.palette.primary.main}
                                    onClick={submitFunc}
                                    variant={'contained'}
                                    text={"إرسال"}
                                    type={"submit"}
                                />
                            </Stack>
                        </Stack>
                    </>
                </DialogContent>
            </ClickAwayListener>
            <DialogActions>
            </DialogActions>
        </Dialog>
    )
}
