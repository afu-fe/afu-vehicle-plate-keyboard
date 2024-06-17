// Define Vue 3 props interface
export interface KeyboardProps {
  visible: boolean;
  value: string;
  done: () => void;
  onChange?: (text: string) => void;
  onCurRule?:(text: string) => void;
  confirmButtonStyle?: Record<string, any>;
  cellTextStyle?: Record<string, any>;
  confirmButtonText?: string;
  defaultConfig?: Record<string, string[][]>;
}