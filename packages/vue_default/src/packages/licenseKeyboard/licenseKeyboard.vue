<template>
  <div 
    id="auto-vehicle-plate-key-board"
    v-if="visible"
    >
    <section
      class="vehicle-plate-keyboard-container"
    >
      <section className="confirm">
            请输入车牌号
          <div className="delWrapper"  @click="handleDone">
            <div
              style={props.confirmButtonStyle}
              className="close"
            >
            </div>
          </div>
        </section>
      <section class="keyboard">
        <RenderProvinceSelect
          v-if="value.length === 0 && charType === '数字'"
          :value="value"
          :firstScreen="firstScreen"
          :secondScreen="secondScreen"
          :cellTextStyle="cellTextStyle"
          :cellDivStyle="cellDivStyle"
          @handleEnter="handleEnter"
          @handleDelete="handleDelete"
        />
        <RenderNumberSelect
          v-else-if="charType === '中文'"
          :firstNumberScreen="firstNumberScreen"
          :value="value"
          :type="onlyAllows"
          :cellTextStyle="cellTextStyle"
          :cellDivStyle="cellDivStyle"
          @handleEnter="handleEnter"
          @handleDelete="handleDelete"
        />
        <renderNumberABCSelect
          v-else
          :secondScreen="secondScreen"
          :value="value"
          :type="onlyAllows"
          :cellTextStyle="cellTextStyle"
          :cellDivStyle="cellDivStyle"
          @handleEnter="handleEnter"
          @handleDelete="handleDelete"
          @handleDone="handleDone"
        />
      </section>
    </section>
  </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, defineProps, watch, StyleValue } from 'vue';
  import { localConfig, ObjType, provinceSelect, numberSelect, numberAbcSelect,secondScreenStatus  } from './config'
  import { mergeAndRemoveDuplicates } from './utils'
  interface DefaultConfig {
    [key: string]: string[];
  }
  const props = defineProps<{
    value: string;
    visible: boolean;
    defalutConfig?: ObjType;
    confirmButtonText?: string;
    confirmButtonStyle?: StyleValue;
    cellTextStyle?: StyleValue;
    cellDivStyle?: StyleValue;
  }>();
  const emit = defineEmits([ "onChange", "done", 'onCurRule']);
  const charType = ref('数字');
  const firstScreen = ref<string[][]>(provinceSelect);
  const secondScreen = ref<string[][]>(numberAbcSelect);
  const firstNumberScreen =  ref<string[][]>(numberSelect);
  const defaultConfig = localConfig(props?.defalutConfig || {});
  const onlyAllows = ref(secondScreenStatus.AllowAll || '');

  const judgeRules = ({ key, len, currentValue }: any): string => {
    const provinceArr = (defaultConfig as DefaultConfig)[key] || [];
    const arr: string[] = [];
    const newArr: string[] = [];
    provinceArr?.forEach((item) => {
      arr.push(item[len]);
      if (len > 0) {
        let flag = false;
        currentValue
          ?.slice(1)
          ?.split('')
          ?.forEach((ites:string, ind:number) => {
            if (item[ind] && item[ind].indexOf(ites) === -1) {
              flag = true;
            }
          });
        if (!flag) {
          newArr.push(item[len]);
        }
      }
    });
    const rules = mergeAndRemoveDuplicates(newArr?.length > 0 ? newArr : arr);
    return rules;
  };
  const handleOnCurRule = (rule: string) => {
    emit('onCurRule', rule);
  };
  watch(()=>props.value,(newValue)=>{
    const vArr = newValue.split('');
    const len = newValue.length;
    if (charType.value === '中文'){
      onlyAllows.value = secondScreenStatus.NumberOnly;
      if (props.visible) {
        let n = '0123456789';
        if (len == 7){
          n = '';
        }
        handleOnCurRule(n);
      }
      if (newValue?.length === 7){
        onlyAllows.value = secondScreenStatus?.DisableAll;
      }
      if (newValue?.length === 6){
        onlyAllows.value = secondScreenStatus?.NoNumberOnly;
      }
    }else{
      let rule = '';
      if (vArr?.length > 0) {
        // 计算规则
        rule = judgeRules({
          key: vArr[0],
          len: len - 1,
          currentValue: newValue,
        });
      }
      handleOnCurRule(rule);
      onlyAllows.value = rule;
    }
  },{immediate:true,deep:true})
  const handleDone = () => {
    emit('done');
  };
  
  const handleEnter = (cell: string) => {
    if (props.value.length < 8) {
      emit('onChange', props.value + cell);
    }
  };
  
  const handleDelete = () => {
    if (props.value.length > 0) {
      emit('onChange', props.value.slice(0, -1));
    }
  };
  onMounted(() => {
    // Show keyboard logic
  });
  
  onUnmounted(() => {
    // Hide keyboard logic
  });
  
  </script>
  <script lang="ts">
    import { defineComponent } from 'vue';
    import KeyCell from './KeyCell.vue';
    import RenderProvinceSelect from './renderProvinceSelect.vue';
    import RenderNumberSelect from './renderNumberSelect.vue';
    import RenderNumberABCSelect from './renderNumberABCSelect.vue';
    
    export default defineComponent({
      name: 'LicenseKeyboard',
      components: {
        KeyCell,
        RenderProvinceSelect,
        RenderNumberSelect,
        RenderNumberABCSelect,
      },
      // 组件的其余逻辑...
    });
  </script>
  <style>
#auto-vehicle-plate-key-board .vehicle-plate-keyboard-container {
  position: fixed;
  min-height: 250px;
  background-color: #e8e9eb;
  bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);

  /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom);

  /* 兼容 iOS >= 11.2 */
  left: 0;
  right: 0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 20%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif;
}
@supports not (constant(safe-area-inset-top)) {
  #auto-vehicle-plate-key-board .vehicle-plate-keyboard-container {
    padding-bottom: 15px;
  }
}
#auto-vehicle-plate-key-board .vehicle-plate-keyboard-container * {
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  *:not(input, textarea) {
  -webkit-touch-callout: none;
  user-select: none;
}

#auto-vehicle-plate-key-board .vehicle-plate-keyboard-container .confirm {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255,255,255,.9);
  position: relative;
}

#auto-vehicle-plate-key-board .vehicle-plate-keyboard-container .confirm .btn {
  font-size: 14px;
  color: #08f;
  text-align: right;
  margin-right: 10px;
  margin-top: 5px;
}
.delWrapper{
  width: 44px;
  height: 44px;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 9999;
}
.close {
  position: relative;
}

.close::before,
.close::after {
  position: absolute;
  content: ' ';
  background-color: #111;
  top: 12px;
  left: 20px;
  width: 1.5px;
  height: 20px;
}

.close::before {
  transform: rotate(45deg);
}

.close::after {
  transform: rotate(-45deg);
}
#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .confirm
  .back-abc {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-left: 10px;
}

#auto-vehicle-plate-key-board .vehicle-plate-keyboard-container .keyboard {
  background-color: #e8e9eb;
  display: flex;
  justify-content: center;
  align-items: center;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container.keyboard-container-province {
  height: 223px;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .back-btn {
  flex: 2;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .back-btn
  .back-btn-box{
  width: 100%;
  height: 100%;
  margin: 4px 2.5px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .back-btn
.back-btn-done{
  background-color: #206cfe;
}
#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .keyboard-row {
    width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}


#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .keyboard-row-province {
    width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .keyboard-row
  .keyboard-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .keyboard-row
  .keyboard-cell
  .cell-text {
  width: 100%;
  height: 100%;
  margin: 4px 2.5px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #333;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .keyboard-row
  .cell-no-disabled:active {
    color: #333;
  /* background-color: #206cfe; */
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .keyboard-row
  .cell-no-disabled:active
  .back-btn-svg {
  color: #fff;
  width: 100%;
  height: 100%;
  margin: 4px 2.5px;
  background-color: white;
  border-radius: 4px;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .keyboard-row
  .cell-no-disabled:active
  .cell-text {
  /* color: #333;
  opacity: 0.1; */
  background-color: #cfd1d5;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .keyboard-row
  .normal-cell {
  flex: 1;
  height: 44px;
  margin: 4px 0;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .keyboard-row
  .province-cell {
  flex:1;
  height: 44px;
  margin: 4px 2.5px;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .keyboard-row
  .number-cell {
  width: 120px;
  height: 44px;
  margin: 4px 2.5px;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .keyboard-row
  .character-cell {
  width: 54px;
  height: 44px;
  margin: 4px 2px;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .cell-disabled {
  opacity: 0.4;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container
  .cell-disabled:active {
  background-color: white;
}

#auto-vehicle-plate-key-board
  .vehicle-plate-keyboard-container
  .keyboard
  .keyboard-container-number
  .keyboard-row
  .back-btn {
  flex: 2;
  height: 44px;
}

.back-btn-svg {
  width: 20px;
  height: 18px;
  line-height: 18px;
  padding-right: 6px;
  font-size: 20px;
  color: #213547;
}

.back-btn-label{
  font-size: 16px;
  color: #fff;
}


  </style>
  