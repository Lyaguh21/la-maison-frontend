import { useStatusQuery } from "@/entities/auth";
import { setUser, userLogout } from "@/entities/user";

import { useAppDispatch } from "@/shared/lib";
import { LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useStatusQuery();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
    }

    if (isError) {
      dispatch(userLogout());
    }
  }, [data, isError]);

  if (isLoading) {
    return (
      <>
        <LoadingOverlay visible={isLoading} />
        {children}
      </>
    );
  }

  return children;
};
