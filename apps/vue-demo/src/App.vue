<template>
  <div>
    <button
      data-test-id="controlButton"
      @click="toggleKeyboard"
      type="submit"
    >
      {{ showKeyboard ? 'close' : 'open' }} the keyboard
    </button>

    <p data-test-id="value">{{ value }}</p>
    <LicenseKeyboard
      :visible="showKeyboard"
      @done="hideKeyboard"
      @onChange="updateValue"
      :value="value"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const showKeyboard = ref(false);
const value = ref('');

const toggleKeyboard = () => {
  showKeyboard.value = !showKeyboard.value;
};

const hideKeyboard = () => {
  showKeyboard.value = false;
};

const updateValue = (newValue:string) => {
  value.value = newValue;
};
</script>
