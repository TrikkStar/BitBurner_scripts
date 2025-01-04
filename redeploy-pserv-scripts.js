/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  const pservs = ns.getPurchasedServers();
  let i = 0;

  while (i < pservs.length) {
    ns.killall(pservs[i]);
    ns.scp("batch-hacking/supervisor.js", pservs[i]);
    ns.scp("batch-hacking/os-runner.js", pservs[i]);
    ns.exec("batch-hacking/supervisor.js", pservs[i], 1, target);
    i++
    await ns.sleep(1000);
  }
}