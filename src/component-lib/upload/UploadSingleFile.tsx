import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import isString from "lodash/isString";
import Image from "next/future/image";
import { useDropzone } from "react-dropzone";
import BlockContent from "./BlockContent";
import RejectionFiles from "./RejectionFiles";
import { UploadProps } from "./type";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// ----------------------------------------------------------------------

export default function UploadSingleFile({
  error = false,
  file,
  helperText,
  sx,
  ...other
}: UploadProps) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    ...other,
  });

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
          ...(file && {
            padding: "12% 0",
          }),
        }}
      >
        <input {...getInputProps()} />

        <BlockContent />

        {file && (
          <Image
            alt="file preview"
            src={isString(file) ? file : file.preview ?? ""}
            // sx={{
            //   top: 8,
            //   left: 8,
            //   borderRadius: 1,
            //   position: "absolute",
            //   width: "calc(100% - 16px)",
            //   height: "calc(100% - 16px)",
            // }}
          />
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      {helperText && helperText}
    </Box>
  );
}