<template>
  <v-dialog v-model="showConfirm" max-width="400">
    <v-card>
      <v-card-title class="text-h6">Confirm Logout</v-card-title>
      <v-card-text>Do you really want to log out of your account?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="showConfirm = false">Cancel</v-btn>
        <v-btn prepend-icon="mdi-logout" color="red" @click="logout">
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-layout>
    <v-navigation-drawer :rail="rail" permanent @click="rail = false">
      <v-list>
        <v-skeleton-loader :loading="loading" type="avatar, list-item-two-line">
          <v-list-item
            prepend-avatar="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
            :title="`
              ${authUser?.first_name}
              ${authUser?.middle_name ? ' ' + authUser?.middle_name : ''}
              ${authUser?.last_name ? ' ' + authUser?.last_name : ''}
            `"
            :subtitle="authUser?.email"
          >
            <template #prepend>
              <v-avatar color="black">
                <span class="text-h6">{{ authUser?.initials }}</span>
              </v-avatar>
            </template>
            <template #append>
              <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
              />
            </template>
          </v-list-item>
        </v-skeleton-loader>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="dashboard"
          @click="$router.push({ name: 'dashboard' })"
        />
        <v-list-item
          v-if="checkPermissions('view-users')"
          prepend-icon="mdi-account-cog-outline"
          title="User Management"
          value="user-management"
          @click="$router.push({ name: 'user-management' })"
        />
        <v-list-item
          v-if="checkPermissions('view-roles')"
          prepend-icon="mdi-head-cog-outline"
          title="Role Management"
          value="role-management"
          @click="$router.push({ name: 'role-management' })"
        />
      </v-list>

      <v-divider></v-divider>

      <template v-slot:append>
        <v-list density="compact">
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            value="logout"
            @click="showConfirm = true"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-main>
      <div style="padding: 20px">
        <router-view />
      </div>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";

const rail = ref(false);

const showConfirm = ref(false);

const { loading, getUser, authUser, logout } = useAuth();

const checkPermissions = (permission: string): boolean => {
  if (!authUser.value?.role?.permissions) {
    return false;
  }

  const value = authUser.value.role.permissions.some(
    (perm: { slug: string }) => perm.slug === permission,
  );

  console.log("Checking permissions for:", permission, "→", value);
  return value;
};

onMounted(async () => {
  await getUser();

  console.log(authUser.value);
});
</script>
