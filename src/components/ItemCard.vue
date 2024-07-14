<template>
  <v-card @click="goToItem(item.id)" class="item-card">
    <v-card-title>{{ item.name }}</v-card-title>
    <div class="item-data">
      <v-card-text v-for="(value, key) in item.data" :key="key" class="item-data-text">
        <b>{{ key }}</b>
        <p>{{ value }}</p>
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

defineProps({
  item: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const goToItem = (id) => {
  router.push(`/item/${id}`);
};
</script>

<style scoped>
.item-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  padding: 16px;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.item-data {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.item-data-text {
  background-color: #f5f5f5;
  padding: 5px 10px;
  border-radius: 5px;
  flex: 1 1 45%;
  text-align: center;
}
</style>