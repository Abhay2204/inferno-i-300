export enum AuraColor {
  WHITE = 'rgba(255, 255, 255, 0.8)',
  BLUE = 'rgba(0, 50, 255, 0.6)',
  PURPLE = 'rgba(180, 0, 255, 0.6)',
  RED = 'rgba(255, 20, 20, 0.6)',
  CYAN = 'rgba(0, 255, 255, 0.6)'
}

export interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  alignment: 'left' | 'right' | 'center' | 'split';
  auraColor: AuraColor;
  onInView: (color: AuraColor) => void;
  index: number;
}
