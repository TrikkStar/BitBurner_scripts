/** @param {NS} ns */
export async function main(ns) {
  
  const operation = ns.args[0];
  const target = ns.args[1];
  ns.asleep(ns.args[2]);

  if (operation == "weaken") {
    await ns.weaken(target);
  } else if (operation == "grow") {
    await ns.grow(target);
  } else {
    await ns.hack(target);
  }
}