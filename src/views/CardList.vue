<template>
  <v-container>
    <v-text-field v-model="searchQuery" label="Search" append-icon="mdi-magnify" single-line
      hide-details></v-text-field>
    <v-row>
      <v-col v-for="item in filteredItems" :key="item.id" cols="12" md="4">
        <v-card @click="goToItem(item.id)">
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>{{ item.data }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-btn @click="loadMore">Load More</v-btn>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useItemStore } from '../stores/useItemStore';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useItemStore();
const searchQuery = ref('');
const router = useRouter();

const filteredItems = computed(() => {
  return store.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const loadMore = () => {

};

const goToItem = (id) => {
  router.push(`/item/${id}`);
};

onMounted(() => {
  store.fetchItems();
});
</script>