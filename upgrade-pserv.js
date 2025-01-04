/** @param {NS} ns */
export async function main(ns) {
  const newRAM = ns.args[0];
  let pservs = ns.getPurchasedServers();
  let i = 0;

  while (i < pservs.length) {
    if (newRAM <= ns.getServerMaxRam(pservs[i])) {
      i++;
      ns.print("Server alread at or over ", newRAM, "GB");
    } else {
      let cost = ns.getPurchasedServerUpgradeCost(pservs[i], newRAM);
      let money = ns.getServerMoneyAvailable("home");
      ns.print("Needed: ", ns.formatNumber(cost), " Available: ", ns.formatNumber(money), " Remaining: ", pservs.length - i);
      if (money > cost) {
        ns.upgradePurchasedServer(pservs[i], newRAM);
        ++i;
      }
    }
    //Make the script wait for a second before looping again.
    //Removing this line will cause an infinite loop and crash the game.
    await ns.sleep(1000);
  }
}