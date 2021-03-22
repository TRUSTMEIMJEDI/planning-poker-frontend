export class PokerUtils {
  public static getUrl(baseUrl: string = window.location.origin): string {
    const pattern = '.{4,5}:\\/\\/[a-z,0-9,.,-]*';
    const regExp = new RegExp(pattern);
    return regExp.exec(baseUrl)[ 0 ] + ':8080/api/';
  }

  public static getBrokerUrl(baseUrl: string = window.location.origin): string {
    const pattern = '.{4,5}:\\/\\/[a-z,0-9,.,-]*';
    const regExp = new RegExp(pattern);
    const brokerURL = regExp.exec(baseUrl)[ 0 ] + ':8080/socket';
    const pattern1 = '.{4,5}:';
    const regExp1 = new RegExp(pattern1);
    return brokerURL.replace(regExp1, 'ws:');
  }
}
