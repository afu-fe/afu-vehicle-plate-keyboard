<template>
  <section
    :class="[ 'back-btn', props.value.length === 0 ? 'cell-disabled' : 'cell-no-disabled' ]"
    @click="handleDone"
    :key="'backBtn'"
  >
    <div className="back-btn-box back-btn-done">
      <span className="back-btn-label">完成</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  value: string;
}>();
const emit = defineEmits([ "handleDone" ]);
const handleDone = () => {
  emit('handleDone');
}
</script>
<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
      name: 'RenderDoneBtn',
      // 组件的其余逻辑...
    });
  </script>
<style scoped>
/* 在这里添加样式 */
</style>
