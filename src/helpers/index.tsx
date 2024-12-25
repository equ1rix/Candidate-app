import { useSelector } from 'react-redux';
import { selectUser } from '../redux/selector';
import { Permissions } from 'hooks/useFetchPermissions';

export const mock = () => {};

export const getPermissions = (permissions: Permissions[]) => {
  const user = useSelector(selectUser);

  const permissionsList = permissions.reduce(
    (acc, permission) => {
      acc[permission.title] =
        user?.allowedFeatures?.includes(permission.id) || false;
      return acc;
    },
    {} as Record<string, boolean>
  );

  return permissionsList;
};
