import { defineStore } from "pinia";
import axios from '../axios';

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    items: [],
    currentItem: null,
    displayedCount: 10,
  }),
  actions: {
    async fetchItems() {
      if(this.items.length === 0){
      const defaultItemsResponse = await axios.get('/objects');
      const createdItemsResponse = await axios.get('/objects?id=ff80818190afe51a0190b1f5634e0223&id=ff80818190afe51a0190b1f7045f0224&id=ff80818190afe51a0190b1f856070228&id=ff80818190afe51a0190b21305390254');
      this.items = [...defaultItemsResponse.data, ...createdItemsResponse.data]
      }
    },
    async fetchItemById(id) {
      const response = await axios.get(`/objects/${id}`);
      this.currentItem = response.data;
    },
    async updateItem(id, updatedItem) {
      try {
        await axios.put(`/objects/${id}`, updatedItem);
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
          this.items[index] = { ...this.items[index], ...updatedItem };
        }
      } catch (error) {
        console.error('Error updating item:', error);
        throw new Error(`Failed to update item with id ${id}. Error: ${error.response?.data?.message || error.message}`);
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/objects/${id}`);
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
          this.items.splice(index, 1);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        throw new Error(`Failed to delete item with id ${id}. Error: ${error.response?.data?.message || error.message}`);
      }
    },
    loadMore() {
      this.displayedCount += 2;
    },
  },
});