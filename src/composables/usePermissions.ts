// composables/usePermissions.ts
import { useAuth } from "@/composables/useAuth";

export const usePermissions = () => {
  const { authUser } = useAuth();

  const checkPermissions = (permission: string): boolean => {
    if (!authUser.value?.role?.permissions) {
      console.log("User not ready, skipping permission check:", permission);
      return false; // safe fallback
    }

    const value = authUser.value.role.permissions.some(
      (perm: { slug: string }) => perm.slug === permission,
    );

    console.log("Checking permissions for:", permission, "→", value);
    return value;
  };

  // Helper functions for common permission patterns
  const canCreate = (entity: string) =>
    checkPermissions(`create-${entity.toLowerCase()}s`);

  const canUpdate = (entity: string) =>
    checkPermissions(`update-${entity.toLowerCase()}s`);

  const canDelete = (entity: string) =>
    checkPermissions(`delete-${entity.toLowerCase()}s`);

  const canView = (entity: string) =>
    checkPermissions(`view-${entity.toLowerCase()}s`);

  return {
    checkPermissions,
    canCreate,
    canUpdate,
    canDelete,
    canView,
  };
};
