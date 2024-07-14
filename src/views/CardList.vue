<template>
  <v-container>
    <v-text-field class="search-field" v-model="searchQuery" label="Search" append-icon="mdi-magnify" single-line
      hide-details />
    <v-row>
      <v-col v-for="item in filteredItems" :key="item.id" cols="12" md="4">
        <ItemCard :item="item" />
      </v-col>
    </v-row>
    <div class="load-more-container">
      <v-btn @click="loadMore" class="load-more-btn">Load More</v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useItemStore } from '../stores/useItemStore';
import { ref, computed } from 'vue';
import ItemCard from '@/components/ItemCard.vue';

const store = useItemStore();
const searchQuery = ref('');

const filteredItems = computed(() => {
  let items = store.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  if (searchQuery.value.trim() !== '') {
    items = items.sort((a, b) => a.name.localeCompare(b.name));
  }

  return items.slice(0, store.displayedCount);
});

const loadMore = () => {
  store.loadMore();
};


onMounted(() => {
  store.fetchItems();
});
</script>

<style scoped>
.search-field {
  margin-bottom: 20px;
}

.load-more-btn {
  margin-top: 20px;
  background-color: #1976d2;
  color: white;
  align-self: center;
}

.load-more-btn:hover {
  background-color: #1565c0;
}

.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>