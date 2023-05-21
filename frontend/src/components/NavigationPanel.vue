<template>
  <div class="nav">
    <div class="tabs logo" />
    <table class="tabs">
      <tr class="tab" :class="{ enter: enterFieldAct }">
        <router-link class="link" to="/fieldact">Полевой акт</router-link>
      </tr>
      <tr class="tab" :class="{ enter: enterDictionary }">
        <router-link class="link" to="/dictionary">Справочники</router-link>
      </tr>
    </table>
    <user-card />
  </div>
</template>

<script>
import UserCard from "./UserCard.vue";

export default {
  components: { UserCard },
  props: {
    enterFieldAct: {
      type: Boolean,
      default: false
    },
    enterDictionary: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    const deleteLocalStorage = () => localStorage.removeItem('currentUser');
    return { user, deleteLocalStorage };
  }
}
</script>

<style scoped>
.nav {
  margin: 0;
  padding: 0;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.tabs {
  display: flex;
  justify-content: center;
  width: 33%;
}

.tab {
  height: 70px;
  width: 100%;
  margin: 0 5px;
  max-width: 200px;
  font-size: 16pt;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-bottom: 1px solid orange;
  border-top: 1px solid orange;
}

.logo {
  background-image: url(../assets/logo.jpg);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 220px auto;
}

.enter {
  color: white;
  border: 1px solid orange;
  background: #ffa6006b;
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>