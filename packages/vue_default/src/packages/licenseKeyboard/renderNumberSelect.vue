<template>
  <article class="keyboard-container keyboard-container-number">
    <template v-for="(row, index) in props.firstNumberScreen">
      <section v-if="index !== 3" class="keyboard-row" :key="index">
        <KeyCell
          v-for="number in row"
          :key="number"
          :cell="number"
          @click="() => handleEnter(number)"
          :disabled="!judgeInput(number, type)"
          :cellTextStyle="cellTextStyle"
          :cellDivStyle="cellDivStyle"
          type="number"
        />
      </section>
      <section v-else class="keyboard-row" :key="'row-' + index">
        <KeyCell
          v-for="number in row"
          :key="number"
          :cell="number"
          @click="() => handleEnter(number)"
          :disabled="!judgeInput(number, type)"
          :cellTextStyle="cellTextStyle"
          :cellDivStyle="cellDivStyle"
          type="number"
        />
        <RenderBackBtn 
          :value="value"
          @handleDelete="handleDelete"
        />
      </section>
    </template>
  </article>
</template>

<script setup lang="ts">
import { defineProps, StyleValue } from 'vue';
import { judgeInput } from './utils'

const props = defineProps<{
  firstNumberScreen: string[][];
  type: string;
  value: string;
  cellTextStyle?: StyleValue;
  cellDivStyle?: StyleValue;
}>();
const emit = defineEmits([ "handleEnter", "handleDelete" ]);
const handleEnter = (str:string) => {
  emit('handleEnter',str);
}
const handleDelete = () => {
  emit('handleDelete');
}
</script>
<script lang="ts">
    import { defineComponent } from 'vue';
    import KeyCell from './KeyCell.vue';
    import RenderBackBtn from './renderBackBtn.vue';
    export default defineComponent({
      name: 'RenderNumberSelect',
      components: {
        KeyCell,
        RenderBackBtn
      },
      // 组件的其余逻辑...
    });
  </script>
<!-- 在这里添加样式 -->
