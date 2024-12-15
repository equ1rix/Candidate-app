import { useFetchUserPermissions } from 'hooks/useFetchUserPermissions';
import { User } from 'redux/reduser';

export const mock = () => {};

export const checkPermission = (user: User) => {
  const { permissions } = useFetchUserPermissions();

  const permissionsList = permissions.reduce(
    (acc, permission) => {
      acc[permission.title] = user.allowedFeatures.includes(permission.id);
      return acc;
    },
    {} as Record<string, boolean>
  );

  return permissionsList;
};
