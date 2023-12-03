import { transparentColor } from "../constants/colors-palette.constant";

export const setColor = (input: string): string => input ? input : transparentColor;
