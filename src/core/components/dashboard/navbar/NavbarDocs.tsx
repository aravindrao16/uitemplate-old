import { Button, Stack, Typography } from "@mui/material";
import DocIllustration from "assets/illustration_doc";
import Config from "config";
import useAuth from "hooks/useAuth";
import { DocumentationUrl } from "paths";

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { accountInfo } = useAuth();

  return (
    <Stack
      spacing={3}
      sx={{
        px: 5,
        pb: 5,
        mt: 10,
        width: 1,
        textAlign: "center",
        display: "block",
      }}
    >
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          Hi, {accountInfo.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Need help?
          <br /> Please check our docs
        </Typography>
      </div>

      <Button variant="contained" href={DocumentationUrl} component={"a"}>
        Documentation
      </Button>

      <div>
        {Config.version && (
          <Typography variant="caption">{`v${Config.version}`}</Typography>
        )}
      </div>
    </Stack>
  );
}
