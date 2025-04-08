declare module 'react-icons/fi' {
  import { FC, SVGAttributes } from 'react';
  
  export interface IconBaseProps extends SVGAttributes<SVGElement> {
    size?: string | number;
    color?: string;
    title?: string;
  }
  
  export type IconType = FC<IconBaseProps>;
  
  export const FiSettings: IconType;
  export const FiClock: IconType;
  export const FiCalendar: IconType;
  export const FiLayout: IconType;
  export const FiType: IconType;
  export const FiSun: IconType;
  export const FiMoon: IconType;
  export const FiGrid: IconType;
  export const FiList: IconType;
  export const FiMaximize2: IconType;
  export const FiMinimize2: IconType;
  export const FiPieChart: IconType;
  export const FiBox: IconType;
} 