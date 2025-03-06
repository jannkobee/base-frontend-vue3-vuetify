<template>
  <v-layout>
    <v-navigation-drawer :rail="rail" permanent @click="rail = false">
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            />
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home"
          title="Home"
          value="admin-home"
          @click="$router.push({ name: 'admin-home' })"
        />
        <v-list-item
          prepend-icon="mdi-account-cog-outline"
          title="User Management"
          value="user-management"
          @click="$router.push({ name: 'user-management' })"
        />
      </v-list>

      <v-divider></v-divider>

      <template v-slot:append>
        <v-list density="compact">
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            value="logout"
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
import { ref } from "vue";

const rail = ref(false);
</script>
