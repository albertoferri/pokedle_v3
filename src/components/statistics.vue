<script>
export default {
  data() {
    return {
      stats: {
        gamesPlayed: 0,
        gamesWon: 0
      },
      winPercentage: 0
    };
  },
  computed: {
    hasStats() {
      return this.stats.gamesPlayed > 0;
    }
  },
  methods: {
    resetStats() {
      this.stats.gamesPlayed = 0;
      this.stats.gamesWon = 0;
      this.winPercentage = 0;
    },
    goBack() {
      window.history.back();
    }
  }
};
</script>


<template>
  <div class="container">
    <div class="button-group mb-5">
      <button @click="goBack" class="btn btn-secondary">Torna Indietro</button>
    </div>
    <h1>Statistiche</h1>
    <div v-if="hasStats">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Statistiche</th>
            <th scope="col">Valore</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr>
            <th scope="row">Partite giocate</th>
            <td>{{ stats.gamesPlayed }}</td>
          </tr>
          <tr>
            <th scope="row">Partite vinte</th>
            <td>{{ stats.gamesWon }}</td>
          </tr>
          <tr>
            <th scope="row">Percentuale di vittorie</th>
            <td>{{ winPercentage }}%</td>
          </tr>
        </tbody>
      </table>
      <button @click="resetStats" class="btn btn-dark">Reset Statistiche</button>
    </div>
    <div class="no-stats" v-else>
      <p>Non ci sono ancora statistiche disponibili. Gioca una partita per vedere le tue statistiche!</p>
      <!-- <button @click="goBack" class="btn btn-secondary">Torna Indietro</button> -->
    </div>
  </div>
</template>


  

  
<style lang="scss" scoped>

*{
  color: white;
}

button{
  padding: 8px 16px;
  background-color: orangered;
  border-radius: 5px;
  border: 1px solid orangered;
  color: white;
  font-weight: bold;
  margin: 0 8px;
  cursor: pointer;
}




</style>