<template>
  <section
    :class="[ TypeToStyle[type], { 'cell-disabled': props.disabled, 'cell-no-disabled': !props.disabled, 'keyboard-cell' : props.cell  } ]"
    role="button"
    @click="handleClick"
    :style="cellDivStyle"
  >
    <span  class="cell-text" :style="cellTextStyle">{{ props.cell }}</span>
  </section>
</template>

<script setup lang="ts">
  import { defineProps, StyleValue } from 'vue';
  // Define props
  const props = defineProps<{
    cell: String;
    disabled?: Boolean;
    type: 'province' | 'normal' | 'number' | 'character';
    onClick: Function;
    cellTextStyle?: StyleValue;
    cellDivStyle?: StyleValue;
  }>();
  // Object mapping cell type to CSS class
  const TypeToStyle = {
    province: 'province-cell',
    character: 'character-cell',
    normal: 'normal-cell',
    number: 'number-cell'
  };

  // Handle click event
  const handleClick = () => {
    if (!props.disabled && typeof props.onClick === 'function' && props.cell) {
      props.onClick(props.cell);
    }
  };
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'KeyCell',
    // 组件的其余逻辑...
  });
</script>