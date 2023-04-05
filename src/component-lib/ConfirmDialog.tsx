import { Dialog, DialogProps, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

// ----------------------------------------------------------------------

export interface Props extends DialogProps {
    variants?: Record<string, unknown>;
    onNo?: VoidFunction;
    onYes?: VoidFunction;
    onClose?: VoidFunction;
    title?: string;
    message: string;
    yesButtonText?: string;
    noButtonText?: string;
    isYesButton?: boolean;
    isNoButton?: boolean;
}

export default function ConfirmDialog({
    open = false,
    onNo,
    onYes,
    onClose,
    title,
    message,
    yesButtonText,
    noButtonText,
    isYesButton,
    isNoButton,
}: Props) {
    return (
        <div>
            {open && (
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    open={open}
                    onClose={onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    hideBackdrop={true}
                >
                    <DialogTitle id="alert-dialog-title">
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {isNoButton && (<Button onClick={onNo}>{noButtonText}</Button>)}
                        {isYesButton && (<Button onClick={onYes} autoFocus>{yesButtonText}</Button>)}
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
}
