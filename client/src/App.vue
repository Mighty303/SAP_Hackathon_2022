<template>
  <div id="app">
    <h1 class="subtitle has-text-centered">Bucket List:</h1>
    <hr />
    <div class ="field has-addons">
      <div class="control is-expanded">
        <input class="input" v-model="title" type="text" placeholder="Go to mars ..." />
      </div>
      <div class="control">
        <a class="button is-info" @click="addItem" :true="!title">Add</a>
      </div>
    </div>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <input class="column input" v-if="isSelected(item)" v-model="editedTitle" />
        <p v-else class="column">
          <span class="tag is-primary">{{ i + 1}}</span>
          {{ item.title }}
        </p>
        <div class="column is-narrow">
          <span class="icon has-text-primary" 
          @click="isSelected(item) ? unselect() : select(item)">
            <i class="material-icons">{{isSelected(item) ? 'close': 'edit'}}</i>
          </span>
          <span class="icon has-text-info" 
          @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)">
            <i class="material-icons">{{isSelected(item) ? 'save': 'delete'}}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: 'App',
    data(){
      return {
        items: [],
        title: "",
        editedTitle: "",
        selected: {}
      };
    },
    async mounted() {
      const response = await axios.get("api/v1/events/");
      this.items = response.data;
    },
  methods: {
    async addItem() {
      const response = await axios.post("api/v1/events/", { 
        title: this.title 
      });
      this.items.push(response.data)
      this.title = "";
    },
    async removeItem(item, i) {
      await axios.delete("api/v1/events/" + item._id);
      this.items.splice(i, 1); //remove from item array
    },
    select(item) {
      this.selected = item;
      this.editedTitle = item.title;
    },
    isSelected(item){
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedTitle = "";
    },
    async updateItem(item, i){
      const response = await axios.patch("api/v1/events/" + item._id, {
        title: this.editedTitle
      });
      this.items[i] - response.data;
      this.unselect();
    }
  }
  };
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>
