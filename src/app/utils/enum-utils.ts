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

      map[ Size.FIB_1 ] = 10;
      map[ Size.FIB_2 ] = 11;
      map[ Size.FIB_3 ] = 12;
      map[ Size.FIB_5 ] = 13;
      map[ Size.FIB_8 ] = 14;
      map[ Size.FIB_13 ] = 15;
      map[ Size.FIB_21 ] = 16;
      map[ Size.FIB_34 ] = 17;
      map[ Size.FIB_55 ] = 18;
      map[ Size.FIB_89 ] = 19;

      map[ Size.MOSCOW_M ] = 20;
      map[ Size.MOSCOW_S ] = 21;
      map[ Size.MOSCOW_C ] = 22;
      map[ Size.MOSCOW_W ] = 23;

      map[ Size.QUESTION ] = 100;

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
