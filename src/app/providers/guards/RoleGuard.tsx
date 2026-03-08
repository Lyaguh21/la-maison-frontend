import { selectUser } from "@/entities/user/model/userSelectors";
import { useAppSelector } from "@/shared/lib";
import { Navigate } from "react-router-dom";

export function RoleGuard({
  roles,
  children,
}: {
  roles: string[];
  children: React.ReactNode;
}) {
  const user = useAppSelector(selectUser);

  if (!roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}
