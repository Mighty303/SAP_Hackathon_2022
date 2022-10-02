<template>
  <div class="top-menu-banner">

    <div>
      <h1>SAP FUN FINDER</h1>
    </div>

    <div class="items">
      <button>Help</button>
    </div>
    <div class="items">
      <button>Profile</button>
    </div>
    <div class="items">
      <button>Settings</button>
    </div>
  </div>

  <div id="event-block">
    <div class="title">
      <h1 class="subtitle has-text-centered">Event List:</h1>
      <hr />
    </div>

    <div class="event-planner">
      <div>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input" v-model="title" type="text" placeholder="Grab a coffee ..." />
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
              <span class="icon has-text-primary" @click="isSelected(item) ? unselect() : select(item)">
                <i class="material-icons">{{isSelected(item) ? 'close': 'edit'}}</i>
              </span>
              <span class="icon has-text-info" @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)">
                <i class="material-icons">{{isSelected(item) ? 'save': 'delete'}}</i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="items">
        <div class col-6>
          <select class="form-select" aria-label="default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>



      <div class col-6>
        <select class="form-select" aria-label="default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class col-6>
        <select class="form-select" aria-label="default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

    </div>

    <div id="bottom-menu">
      <div class="items">
        <h1>SAP FUN FINDER</h1>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
  },
  name: 'App',
  data() {
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
    isSelected(item) {
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedTitle = "";
    },
    async updateItem(item, i) {
      const response = await axios.patch("api/v1/events/" + item._id, {
        title: this.editedTitle
      });
      this.items[i] - response.data;
      this.unselect();
      this.items[i] = response.data;
    }
  }
};
</script>

<style>
#event-block {
  display: block;
  overflow: auto;
}

.title {
  margin: 25px auto auto auto;
  max-width: 1200px;

  background: grey;
  padding: 15px;
  border-radius: 20px;
}

.event-planner {
  display: flex;
  flex-direction: row;
  margin: -60px auto 1em auto;
  max-width: 1200px;

  background: grey;
  padding: 15px;
  border-radius: 20px;
}

.icon {
  cursor: pointer;
}

.top-menu-banner {
  display: flex;
  flex-direction: row;
  background: rgb(0, 97, 153);
  justify-content: right;
  align-items: center;
  height: 50px;
  padding-right: 1em;
  gap: 10px;
}

.items {
  display: flex;
  flex-direction: row;
}

#bottom-menu {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: auto;
  left: auto;
  background: rgb(0, 97, 153);
  ;
  height: 50px;
  width: 100%;
}

h1 {
  color: white;

}
</style>
