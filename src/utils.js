export default class Utils{
    static dayDarkSwitch(ref, nxt) {
        for (const nxtKey in nxt) {
          ref[nxtKey] = nxt[nxtKey];
        }
      }
      static stuUrl="http://localhost:10010/stu"
      static dataUrl="http://localhost:10010/data"
}