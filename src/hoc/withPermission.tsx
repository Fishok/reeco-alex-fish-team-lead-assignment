import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector.ts';


const withPermission = (requiredPermission: string) =>
  <T extends object> (WrappedComponent: React.ComponentType<T>) => {
    return (props: T) => {
      const permissions = useAppSelector((state) => state.auth.permissions);

      if (!permissions.includes(requiredPermission)) {
        return null;
      }

      return <WrappedComponent {...props} />;
    };
  };

export default withPermission;
