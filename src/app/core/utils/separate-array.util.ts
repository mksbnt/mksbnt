import { IPath } from "../interfaces/svg.interface";
import { roundNumber } from "./number.util";

export function separateArray(arr: IPath[]): [IPath[], IPath[]] {
    const firstArr: IPath[] = [];
    const secondArr: IPath[] = [];

    for (let i = 0; i < arr.length; i++) {
        if (i < roundNumber(arr.length / 2) - 1) {
            firstArr.push(arr[i]);
        } else {
            secondArr.push(arr[i]);
        }
    }

    return [firstArr, secondArr];
  }