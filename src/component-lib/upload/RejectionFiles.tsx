import { Box, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FileRejection } from "react-dropzone";
import { fData } from "util/formatNumber";
import { CustomFile } from "./type";

// ----------------------------------------------------------------------

type Props = {
  fileRejections: FileRejection[];
};

export default function RejectionFiles({ fileRejections }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: "error.light",
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size }: CustomFile = file;

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>

            {errors.map((error) => (
              <Typography key={error.code} variant="caption" component="p">
                - {error.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
}
