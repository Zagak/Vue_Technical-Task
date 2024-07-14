<template>
  <v-dialog v-model="localVisible" max-width="500">
    <v-card>
      <v-card-title class="headline">{{ headline }}</v-card-title>
      <v-card-text>{{ description }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-1" text @click="cancel">Cancel</v-btn>
        <v-btn color="red darken-1" text @click="confirm">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  headline: {
    type: String,
    require: true
  },
  description: {
    type: String
  }
});

const emit = defineEmits(['update:visible', 'confirm']);

const localVisible = ref(props.visible);

watch(() => props.visible, (newVal) => {
  localVisible.value = newVal;
});

const cancel = () => {
  emit('update:visible', false);
};

const confirm = () => {
  emit('confirm');
  emit('update:visible', false);
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>