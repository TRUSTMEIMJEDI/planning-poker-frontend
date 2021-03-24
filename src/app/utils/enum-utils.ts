import { Size } from '../models/size';

export class EnumUtils {

  public static getSizeCompareFn(): (a, b) => number {
    return (a, b) => {
      const map = {};
      map[ Size.XXS ] = 1;
      map[ Size.XS ] = 2;
      map[ Size.S ] = 3;
      map[ Size.M ] = 4;
      map[ Size.L ] = 5;
      map[ Size.XL ] = 6;
      map[ Size.XXL ] = 7;
      map[ Size.XXXL ] = 8;

      if (map[ Size[ a ] ] < map[ Size[ b ] ]) {
        return -1;
      }

      if (map[ Size[ a ] ] > map[ Size[ b ] ]) {
        return 1;
      }

      return 0;
    };
  }
}
