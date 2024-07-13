<template>
  <v-container>
    <v-text-field v-model="item.name" :label="capitalizeFirstLetter('name')" v-if="!loading"></v-text-field>

    <div v-if="!loading">
      <div v-for="(value, key) in item.data" :key="key">
        <v-text-field v-model="item.data[key]" :label="capitalizeFirstLetter(key)"
          :type="getInputType(value)"></v-text-field>
      </div>
    </div>

    <v-btn :disabled="!hasChanges || loading" @click="saveChanges">Save Changes</v-btn>
    <v-btn :disabled="!hasChanges || loading" @click="discardChanges">Discard Changes</v-btn>
    <v-btn @click="deleteItem" :disabled="loading">Delete</v-btn>

    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
  </v-container>
</template>

<script setup>
import { useItemStore } from '../stores/useItemStore';
import { ref, computed, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCapitalizeFirstLetter } from '../composables/useCapitalizeFirstLetter';

const store = useItemStore();
const item = ref({ id: 0, name: '', data: {} });
const loading = ref(true);
const route = useRoute();
const router = useRouter();
const { capitalizeFirstLetter } = useCapitalizeFirstLetter();

const getInputType = (value) => {
  return typeof value === 'number' ? 'number' : 'text';
};

const hasChanges = computed(() => {
  if (!item.value || !store.currentItem) {
    return false;
  }

  return (
    item.value.name !== store.currentItem.name ||
    JSON.stringify(item.value.data) !== JSON.stringify(store.currentItem.data)
  );
});

const saveChanges = () => {
  console.log(item.value.id)
  console.log(item.value)
  store.updateItem(item.value.id, item.value);
};

const discardChanges = () => {
  item.value = JSON.parse(JSON.stringify(store.currentItem));
};

const deleteItem = () => {
  store.deleteItem(item.value.id);
  router.push('/');
};

const fetchData = async (id) => {
  loading.value = true;
  await store.fetchItemById(id);
  item.value = JSON.parse(JSON.stringify(store.currentItem));
  loading.value = false;
};

watchEffect(() => {
  const id = route.params.id;
  fetchData(id);
});

watch(
  () => item.value.data,
  (newData) => {
    for (const key in newData) {
      if (typeof store.currentItem.data[key] === 'number') {
        item.value.data[key] = parseFloat(newData[key]);
      }
    }
  },
  { deep: true }
);


</script>