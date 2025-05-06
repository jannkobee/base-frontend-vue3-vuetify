<template>
  <v-container class="container">
    <v-sheet class="sheet">
      <h3 style="padding: 0 0 20px 0">Portal Login</h3>
      <v-form>
        <v-text-field
          v-model="form.email"
          hint="Enter your Email Address"
          label="Email"
        />
        <v-text-field
          v-model="form.password"
          hint="Enter your Password"
          label="Password"
          type="password"
        />

        <div class="d-flex flex-column">
          <v-btn class="mt-4" color="success" block @click="handleLogin">
            Login
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useAuth } from "@/composables/useAuth";

const form = reactive({
  email: "",
  password: "",
});

const { login } = useAuth();

const handleLogin = async () => {
  await login(form);
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sheet {
  width: 500px;
}

@media (max-width: 1200px) {
  .sheet {
    width: 100%;
  }
}
</style>
