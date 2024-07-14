<template>
  <v-container>
    <v-alert v-if="errorMessage" type="error" dismissible @click="clearError">{{ errorMessage }}</v-alert>

    <v-text-field v-model="item.name" :label="capitalizeFirstLetter('name')" v-if="!loading" />

    <div v-if="!loading">
      <div v-for="(value, key) in item.data" :key="key">
        <v-text-field v-model="item.data[key]" :label="capitalizeFirstLetter(key)"
          :type="typeof (value)"></v-text-field>
      </div>
    </div>

    <v-btn color="green darken-1" :disabled="!hasChanges || loading" @click="saveChanges">Save Changes</v-btn>
    <v-btn color="yellow darken-1" :disabled="!hasChanges || loading" @click="discardChanges">Discard Changes</v-btn>
    <v-btn color="red darken-1" @click="showDeleteConfirmation" :disabled="loading">Delete</v-btn>

    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>

    <!-- Utilizarea componentei DeleteConfirmationDialog -->
    <ConfirmationDialog :visible="deleteDialog" headline="Confirm Delete"
      description="Are you sure you want to delete this item?" @update:visible="deleteDialog = $event"
      @confirm="confirmDelete" />
  </v-container>
</template>

<script setup>
import { useItemStore } from '../stores/useItemStore';
import { ref, computed, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCapitalizeFirstLetter } from '../composables/useCapitalizeFirstLetter';
import ConfirmationDialog from '../components/ConfirmationDialog.vue';

const store = useItemStore();
const item = ref({ id: 0, name: '', data: {} });
const loading = ref(true);
const errorMessage = ref('');
const deleteDialog = ref(false);

const route = useRoute();
const router = useRouter();
const { capitalizeFirstLetter } = useCapitalizeFirstLetter();

const clearError = () => {
  errorMessage.value = '';
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

const saveChanges = async () => {
  try {
    await store.updateItem(item.value.id, item.value);
    store.currentItem = JSON.parse(JSON.stringify(item.value));
    clearError();
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const discardChanges = () => {
  item.value = JSON.parse(JSON.stringify(store.currentItem));
};

const showDeleteConfirmation = () => {
  deleteDialog.value = true;
};

const confirmDelete = async () => {
  try {
    await store.deleteItem(item.value.id);
    clearError();
    deleteDialog.value = false;
    router.push('/');
  } catch (error) {
    errorMessage.value = error.message;
    deleteDialog.value = false;
  }
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

<style scoped>
.v-card {
  padding: 20px;
}

.v-card-title {
  font-size: 24px;
  font-weight: bold;
}

.v-card-actions {
  justify-content: flex-end;
}

.v-btn {
  margin: 5px;
}
</style>