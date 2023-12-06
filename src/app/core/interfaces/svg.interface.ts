export interface IPath {
  stroke: string;
  strokeWidth: string;
  d: string;
  opacity?: string;
}

interface ILinearGradientStop {
  offset: string;
  stopOpacity?: string;
  stopColor?: string;
}

export interface ILinearGradient {
  id: string;
  x1: string;
  x2: string;
  y1: string;
  y2: string;
  gradientUnits: string;
  stop: ILinearGradientStop[];
}

export interface ISVG {
  width: string;
  height: string;
  fill: string;
  g: {
    strokeMiterlimit: string;
    path: IPath[];
  };
  defs: {
    linearGradient: ILinearGradient[];
  };
}
