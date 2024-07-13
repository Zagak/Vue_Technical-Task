import { defineStore } from "pinia";
import axios from '../axios';

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    items: [],
    currentItem: null,
  }),
  actions: {
    async fetchItems() {
      const response = await axios.get('/objects');
      this.items = response.data;
      console.log(this.items)
    },
    async fetchItemById(id) {
      console.log("ma apelez")
      const response = await axios.get(`/objects/${id}`);
      this.currentItem = response.data;
      console.log(this.currentItem)
    },
    async updateItem(id, updatedItem) {
      await axios.put(`/objects/${id}`, updatedItem);
      //this.fetchItems();
    },
    async deleteItem(id) {
      await axios.delete(`/objects/${id}`);
      //this.fetchItems();
    },
  },
});