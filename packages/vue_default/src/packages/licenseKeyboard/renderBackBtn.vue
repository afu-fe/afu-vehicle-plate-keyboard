<template>
  <section
    :class="[ 'back-btn', props.value.length === 0 ? 'cell-disabled' : 'cell-no-disabled' ]"
    @click="handleDelete"
    :key="'backBtn'"
  >
    <div className="back-btn-box">
      <span className="back-btn-svg">&#9003;</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  value: string;
}>();
const emit = defineEmits([ "handleDelete" ]);
const handleDelete = () => {
  emit('handleDelete');
}
</script>
<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
      name: 'RenderBackBtn',
      // 组件的其余逻辑...
    });
  </script>
<style scoped>
/* 在这里添加样式 */
</style>
