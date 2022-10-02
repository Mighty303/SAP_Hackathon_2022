<template>

  <div class="top-menu-banner">
    <div class="top-menu-title">
      <h1>SAP Fun Finder</h1>
    </div>

    <div class="top-menu-buttons">
      <div class="items">
        <button>Help</button>
      </div>
      <button>Profile</button>
      <div class="items">
        <button>Settings</button>
      </div>
      <div class="items">
        <img src="../src/assets/calendar.png" height="40" width="40" alt="calendar-logo" />
      </div>
    </div>
  </div>

  <div id="event-block">
    <div class="title">
      <h1 id="white-header" class="subtitle has-text-centered">Event List</h1>
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




      <div class="event-form">
        <div>
          Choose Capacity<br>
        </div>
        <div>
          <select class="form-select" v-model="capacity">
            <option value=2>Two</option>
            <option value=3>Three</option>
            <option value=4>Four</option>
            <option value=5>Five</option>
          </select>
        </div>
        <div>
          <form action="" method="get">
            Choose Event Date and Time<br><input type="datetime-local" v-model="time" name="datetime"><br>
          </form>
        </div>
      </div>

    </div>

    <div id="bottom-menu">
      <div class="items">
        <h2>SAP FUN FINDER</h2>
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
      selected: {},
      time: "",
      capacity: 2,
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
h1,
h2 {
  color: white;
}

.event-form {
  display: flex;
  flex-direction: column;
}

#event-list {
  text-align: center;
  text-transform: uppercase;
}

#event-block {
  display: block;
  overflow: auto;
}

.title {
  margin: 25px auto auto auto;
  max-width: 1200px;

  background: rgb(0, 97, 153);
  padding: 15px;
  border-radius: 20px;
}

.event-planner {
  display: flex;
  flex-direction: row;
  margin: -60px auto 1em auto;
  max-width: 1200px;

  background: rgb(207, 204, 204);
  padding: 15px;
  border-radius: 20px;
}

.icon {
  cursor: pointer;
}

.top-menu-banner {
  display: flex;
  background: rgb(0, 97, 153);
  height: 50px;
  padding-right: 1em;
  gap: 10px;
}

.top-menu-title {
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;
  padding: 2px;
  margin: auto 0px auto 400px;
  width: 75%;
}

.top-menu-buttons {
  display: flex;
  flex-direction: row;
  justify-content: right;
  width: 25%;
  align-items: center;
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
  height: 50px;
  width: 100%;
}

h1 {
  color: white;
  font-size: 32px;
}

#white-header {
  color: white;
  font-size: 64px;
}
</style>
