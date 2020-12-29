<template>
  <div>
    <div class="line">
      <div class="banner">
        <img src="../assets/logo.svg" alt="logo-ckechpoint" />
        <h1>Checkpo!nt</h1>
      </div>
    </div>
    <div class="line">
      <div class="col-5">
        <div class="input-block">
          <label for="name">Descrição</label>
          <input v-model="name" id="name" type="text" />
        </div>
      </div>
      <div class="col-2">
        <div class="input-block">
          <label for="ended">Conclusão</label>
          <input v-model="ended" id="ended" type="time" />
        </div>
      </div>
      <div class="col-3">
        <div class="input-block">
          <label for="type">Tipo</label>
          <select v-model="type" id="type">
            <option value="PAID">Remunerado</option>
            <option value="UNPAID">Não Remunerado</option>
            <option value="JUSTIFIED_ABSENCE">Falta Justificada</option>
            <option value="UNEXCUSED_ABSENCE">Falta Não Justificada</option>
          </select>
        </div>
      </div>
      <div class="col-2">
        <div class="button-block">
          <button v-on:click="newActivity">Inserir</button>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Início</th>
          <th>Fim</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in activities" v-bind:key="activity.id">
          <td>{{ activity.name }}</td>
          <td>{{ activity.beginning }}</td>
          <td>{{ activity.ended }}</td>
          <td>
            <select v-bind:value="activity.type" class="masked-option" disabled>
              <option value="PAID">Remunerado</option>
              <option value="UNPAID">Não Remunerado</option>
              <option value="JUSTIFIED_ABSENCE">Falta Justificada</option>
              <option value="UNEXCUSED_ABSENCE">Falta Não Justificada</option>
            </select>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total Remunerado: {{ summary.worked }}</td>
          <td>Total Não Remunerado: {{ summary.strayed }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
.banner {
  display: flex;
  margin: 15px;
  align-items: center;
}

.banner img {
  width: 50px;
  height: 50px;
  margin: 5px;
}

.banner h1 {
  color: rgb(90, 97, 97);
  font-family: "Lucida Sans Unicode", sans-serif;
}

.line {
  display: flex;
  margin-bottom: 15px;
}

.input-block {
  margin: 10px;
  display: flex;
  flex-direction: column;
}

.button-block {
  margin: 25px 10px 10px 10px;
}
.masked-option {
  border: none;
  color: black;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 0.9rem;
}
</style>

<script>
import axios from "axios";

export default {
  name: "Index",
  mounted() {
    this.updateTable();
  },
  data() {
    return {
      today: this.getToday(),
      ended: new Date().toTimeString().substring(0, 5),
      name: "",
      type: "PAID",
      activities: [],
      summary: {
        worked: "00:00",
        strayed: "00:00",
      },
    };
  },
  methods: {
    getToday() {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    updateTable() {
      axios
        .get(`http://localhost:9100/activity/${this.today}`)
        .then((response) => (this.activities = response.data))
        .then(
          axios
            .get(`http://localhost:9100/activity/summary/${this.today}`)
            .then((response) => (this.summary = response.data))
        );
    },
    newActivity() {
      const activity = {
        reference: this.today,
        name: this.name.toUpperCase(),
        ended: this.ended,
        type: this.type,
      };

      axios
        .post("http://localhost:9100/activity", activity)
        .then(() => this.updateTable())
        .then(() => this.reset());
    },
    reset() {
      (this.name = ""),
        (this.type = "PAID"),
        (this.ended = new Date().toTimeString().substring(0, 5));
    },
  },
};
</script>