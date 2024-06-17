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
      v-if="showKeyboard"
      :visible="showKeyboard"
      @done="hideKeyboard"
      @onChange="updateValue"
      @onCurRule="handleonCurRule"
      :value="value"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// const confirmButtonText = "确定"
// const cellTextStyle = {
//   color: 'red',
//   fontSize: '16px'
// }
// const cellDivStyle = {
//   backgroundColor: 'black',
// }
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
const handleonCurRule = (text: string) => {
  console.log('text', text);
}
</script>

<style scoped>
/* Add your CSS styles here */
</style>
