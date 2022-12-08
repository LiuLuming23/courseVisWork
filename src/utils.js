export default class Utils{
    static dayDarkSwitch(ref, nxt) {
        for (const nxtKey in nxt) {
          ref[nxtKey] = nxt[nxtKey];
        }
      }
}