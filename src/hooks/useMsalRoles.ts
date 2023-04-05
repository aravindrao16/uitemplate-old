import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";

type Claim = {
  id: number;
  claim: string;
  value: string | null;
};

function getClaims(claims: any): Claim[] {
  let list: Claim[] = new Array<Claim>();

  Object.keys(claims).forEach(function (claim, id) {
    list.push({
      id,
      claim,
      value: claims ? claims[claim] : null,
    });
  });

  return list;
}

export default function useMsalRoles() {
  const { accountInfo, isLoading } = useAuth();
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    if (isLoading || !accountInfo.idTokenClaims) {
      return;
    }
    const claims = getClaims(accountInfo.idTokenClaims);
    console.log("claims", claims);
    const roleClaims = claims.filter((claim) => claim.claim === "roles");

    if (roleClaims.length > 0 && roleClaims[0].value) {
      setRoles(Array.from(roleClaims[0].value));
    }
  }, [accountInfo.idTokenClaims, isLoading]);

  return roles;
}
