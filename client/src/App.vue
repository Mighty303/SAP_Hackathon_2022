<template>

  <div class="top-menu-banner">
    <div class="top-menu-title">
      <h1 id="header-h1">
        <img height="20%" width="20%" src="../logo.png"> Fun Finder</h1>
    </div>

    <div class="top-menu-buttons">
      <div class="items">
        <button class="button-1">Help</button>
      </div>
      <button class="button-1">Profile</button>
      <div class="items">
        <button class="button-1">Settings</button>
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
        <div class="notification" v-for="(item, i) in items" :key="item._id">
          <div class="columns">
            <input class="column input" v-if="isSelected(item)" v-model="editedTitle" />
            <p v-else class="column ">
              <span class="tag is-primary">{{ i + 1}}</span>
              <span class="event-capacity"> date: {{ item.time}}</span>
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
        <div class="">
          <label> Enter event name:
            <input class="txt-field" v-model="title" type="text" placeholder="Grab a coffee ..." required/>
          </label>
        </div>
        <div>
          Choose Capacity<br>
          <input type="number" max="150" min="2"  v-model="capacity" />
        </div>
        <div>
          <form action="" method="get">
            Choose Event Date and Time<br><input type="datetime-local" v-model="time" name="datetime"><br>
          </form>
        </div>
        <div class="btn-submit">
            <a class="button is-info" @click="addItem" :true="!title">Add</a>
        </div>
      </div>
    </div>

    <button class="button-3">Join An Event</button>

    <div id="bottom-menu">
      <div class="items">
        <h2>SAP FUN FINDER</h2>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import moment from 'moment'

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
      time: moment(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).format('YYYY-MM-DDTHH:mm'),
      capacity: 2,
    };
  },
  async mounted() {
    const response = await axios.get("api/v1/events/");
    this.items = response.data;
  },
  methods: {
    moment: function () {
      return moment();
    },
    async addItem() {
      const response = await axios.post("api/v1/events/", {
        title: this.title,
        time: this.time,
        capacity: this.capacity,
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
  @import '../public/style.css';
</style>
