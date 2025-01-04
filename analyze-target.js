/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  const moneyThresh = ns.getServerMaxMoney(target);
  const securityThresh = ns.getServerMinSecurityLevel(target);

  while (true) {
    let available = ns.getServerMoneyAvailable(target);
    let secLev = ns.getServerSecurityLevel(target);
    ns.print("Target: ", target);
    ns.print(ns.formatNumber(available), " availbale of ", ns.formatNumber(moneyThresh));
    ns.print(ns.formatNumber(secLev), " secLev of ", ns.formatNumber(securityThresh));
    // ns.print(ns.formatPercent(ns.getServerGrowth(target)), " growth");
    ns.print(ns.tFormat(ns.getHackTime(target)), " hack time");
    ns.print(ns.tFormat(ns.getGrowTime(target)), " grow time");
    ns.print(ns.tFormat(ns.getWeakenTime(target)), " weaken time");
    await ns.sleep(5000);
  }
}