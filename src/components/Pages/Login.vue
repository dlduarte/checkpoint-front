<template>
  <div class="background">
    <v-container fill-height>
      <v-card elevation="2" class="mx-auto my-12" width="450">
        <v-img
          class="white--text align-end"
          src="@/assets/cartao-login.jpg"
          height="200px"
        >
          <v-card-title>On software<small>©</small></v-card-title>
        </v-img>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="account.identification"
                label="Identificação"
                prepend-icon="mdi-account"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="account.password"
                label="Senha"
                prepend-icon="mdi-lock"
                type="password"
                count
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-1" text @click="$router.push('/register')"
            >Registrar</v-btn
          >
          <v-btn color="blue darken-1" text @click="login">Entrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import { auth_authenticate, errorHandling } from '../../api';

export default {
  name: "Login",
  data() {
    return {
      account: {
        identification: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      let success = false;
      await axios
        .post(auth_authenticate, this.account)
        .then((resp) => {
          Cookies.set("authentication", JSON.stringify(resp.data));
          success = true;
        })
        .catch((err) => this.$toast.error(errorHandling(err)));

      if (success) {
        this.$router
          .push("/activities")
          .catch((err) => this.$toast.error(errorHandling(err)));
      }
    },
  },
};
</script>
<style scoped>
html {
  overflow: hidden;
}
.background {
  height: 100vh;
  background: url('~@/assets/background-login.jpg')
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>