<template>
  <article class="keyboard-container keyboard-container-noprovince">
    <section v-for="(row, index) in secondScreen" :key="index" class="keyboard-row">
        <KeyCell
          v-for="(cell, ind) in row" :key="ind"
          :cellTextStyle="cellTextStyle"
          :cellDivStyle="cellDivStyle"
          :cell="cell"
          @click="() => handleEnter(cell)"
          :disabled="!judgeInput(cell, type)"
          :type="index === 4 ? 'character' : 'normal'"
        />
      <!-- 在最后一行添加返回按钮 -->
      <template v-if="index === 3">
        <!-- 渲染返回按钮 -->
        <RenderBackBtn
          :value="value"
          @handleDelete="handleDelete"
        />
        <RenderDoneBtn
          :value="value"
          @handleDone="handleDone"
        />
      </template>
    </section>
  </article>
</template>

<script setup lang="ts">
import { defineProps, StyleValue } from 'vue';
import { judgeInput, secondScreenType } from './utils'
const props = defineProps<{
  cellTextStyle?: StyleValue;
  cellDivStyle?: StyleValue;
  secondScreen: string[][];
  type: secondScreenType;
  value: string;
}>();
console.log('====', props.type);
const emit = defineEmits([ "handleEnter", "handleDelete", "handleDone" ]);
const handleEnter = (cell:string) => {
  emit('handleEnter', cell);
}
const handleDelete = () => {
  emit('handleDelete');
}
const handleDone = () =>{
  emit('handleDone');
}
</script>
<script lang="ts">
    import { defineComponent } from 'vue';
    import KeyCell from './KeyCell.vue';
    import RenderBackBtn from './renderBackBtn.vue';
    import RenderDoneBtn from './renderDoneBtn.vue';

    export default defineComponent({
      name: 'renderNumberABCSelect',
      components: {
        KeyCell,
        RenderBackBtn,
        RenderDoneBtn
      },
      // 组件的其余逻辑...
    });
  </script>
<!-- 在这里添加样式 -->
