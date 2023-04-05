import { InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { LoadingButton } from "@mui/lab";
import { loginPopupRequest } from "authConfig";
import Config from "config";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import { useCallback } from "react";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { instance, inProgress } = useMsal();
  const router = useRouter();
  const { setIsLoading, loginSuccess, loginFailure } = useAuth();

  const doLogin = useCallback(() => {
    setIsLoading(true);

    // This only logs us in and ONLY stores an identity token.
    instance
      .loginPopup(loginPopupRequest)
      .then((response) => {
        if (response.account) {
          //console.log("user details", response);
          instance.setActiveAccount(response.account);
          loginSuccess(response.account);
        } else {
          loginFailure();
        }
      })
      .catch((error) => {
        console.log(`Error In loginPopup: ${error}`);
        loginFailure();
      })
      .then(() => {
        router.push(Config.pathAfterLogin);
      });
  }, [instance, loginFailure, loginSuccess, router, setIsLoading]);

  return (
    <LoadingButton
      onClick={() => doLogin()}
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      loading={inProgress !== InteractionStatus.None}
    >
      Login
    </LoadingButton>
  );
}
