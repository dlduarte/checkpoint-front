<template>
  <div class="background">
    <v-container fill-height>
      <v-card elevation="2" class="mx-auto my-12" width="550">
        <v-img
          class="white--text align-end"
          src="@/assets/cartao-login.jpg"
          height="200px"
        >
          <v-card-title>On software<small>©</small></v-card-title>
        </v-img>

        <v-card-text>
          <div class="my-4 subtitle-1">Registrar-se</div>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="account.name"
                label="Nome"
                prepend-icon="mdi-alpha-i-box"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                type="email"
                v-model="account.email"
                label="Email"
                prepend-icon="mdi-email"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="account.username"
                label="Usuário"
                prepend-icon="mdi-account"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="account.password"
                label="Senha"
                prepend-icon="mdi-lock"
                :type="showPws ? 'text' : 'password'"
                :append-icon="showPws ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPws = !showPws"
                count
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="account.password2"
                label="Repetir Senha"
                prepend-icon="mdi-lock"
                :type="showPws2 ? 'text' : 'password'"
                :append-icon="showPws2 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPws2 = !showPws2"
                count
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-1" text @click="$router.push('/')"
            >Voltar</v-btn
          >
          <v-btn color="blue darken-1" text @click="register">Registrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { auth_register, errorHandling } from '../../api';

export default {
  name: "FormLogin",
  data() {
    return {
      account: {
        name: "",
        email: "",
        username: "",
        password: "",
        password2: "",
      },
      showPws: false,
      showPws2: false,
      error: { render: false, message: "" },
      success: {
        render: false,
        message: "",
      },
    };
  },
  methods: {
    async register() {
      if (this.account.password === this.account.password2) {
        await axios
          .post(auth_register, this.account)
          .then((data) => {
            this.account = {
              name: "",
              email: "",
              username: "",
              password: "",
              password2: "",
            };
            this.$toast.success(
              "Registro realizado com sucesso! Acesse seu e-mail para confirmar sua conta."
            );
          })
          .catch((err) => this.$toast.error(errorHandling(err)));
      } else {
        this.$toast.error("As senhas digitadas não coincidem");
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