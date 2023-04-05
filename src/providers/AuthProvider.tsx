import { AccountInfo } from "@azure/msal-browser";
import useLocalStorage from "hooks/useLocalStorage";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from "react";
// ----------------------------------------------------------------------

type RoleInfo = {
  id: string;
  appRoleId: string;
  principalDisplayName: string;
  principalId: string;
  principalType: string;
  createdDateTime: string;
  deletedDateTime?: string;
  resourceDisplayName: string;
  resourceId: string;
};

type AuthState = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isAuthenticated: boolean;
  accountInfo: AccountInfo;
  rolesAssigned: Array<RoleInfo>;
  setRolesAssigned: (rolesAssigned: Array<RoleInfo>) => void;
  loginSuccess: (accountInfo: AccountInfo) => void;
  loginFailure: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const anonInfo: AccountInfo = {
  homeAccountId: "",
  environment: "",
  tenantId: "",
  username: "",
  localAccountId: "",
  name: "Anon",
  idTokenClaims: undefined,
};

const stub = (): never => {
  throw new Error("You forgot to wrap your component in <AuthProvider>.");
};

const initialState: AuthState = {
  isLoading: false,
  setIsLoading: stub,
  isAuthenticated: false,
  accountInfo: anonInfo,
  rolesAssigned: [],
  setRolesAssigned: stub,
  loginSuccess: stub,
  loginFailure: stub,
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "authenticated",
    false,
  );
  const [rolesAssigned, setRolesInfo] = useLocalStorage("roles", []);
  const [accountInfo, setAccountInfo] = useLocalStorage("auth", anonInfo);

  const setRolesAssigned = useCallback(
    (rolesAssigned: Array<RoleInfo>) => {
      setRolesInfo(rolesAssigned);
    },
    [setRolesInfo],
  );

  const loginSuccess = useCallback(
    (accountInfo: AccountInfo) => {
      setAccountInfo(accountInfo);
      setIsAuthenticated(true);
      setIsLoading(false);
    },
    [setAccountInfo, setIsAuthenticated],
  );

  const loginFailure = useCallback(() => {
    setAccountInfo(anonInfo);
    setIsAuthenticated(false);
    setIsLoading(false);
  }, [setAccountInfo, setIsAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isAuthenticated,
        accountInfo,
        rolesAssigned,
        setRolesAssigned,
        loginSuccess,
        loginFailure,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
export type { AuthState };
