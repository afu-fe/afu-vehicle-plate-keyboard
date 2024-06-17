<template>
  <article class="keyboard-container">
    <section v-for="(row, index) in props.firstScreen" :key="index" class="keyboard-row">
      <KeyCell
        v-for="province in row"
        :key="province"
        :cell="province"
        :onClick="() => handleEnter(province)"
        :cellTextStyle="cellTextStyle"
        :cellDivStyle="cellDivStyle"
        type="province"
      />
    </section>
  </article>
</template>

<script setup lang="ts">
import { defineProps, StyleValue } from 'vue';

const props = defineProps<{
  firstScreen: string[][];
  secondScreen: string[][];
  value: string;
  cellTextStyle?: StyleValue;
  cellDivStyle?: StyleValue;
}>();
const emit = defineEmits([ "handleEnter", "handleDelete" ]);
const handleEnter = (cell:string) => {
  emit('handleEnter', cell);
}
</script>
<script lang="ts">
    import { defineComponent } from 'vue';
    import KeyCell from './KeyCell.vue';
    export default defineComponent({
      name: 'RenderProvinceSelect',
      components: {
        KeyCell,
        
      },
      // 组件的其余逻辑...
    });
  </script>

<!-- 在这里添加样式 -->
