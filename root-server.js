/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  
  if (ns.fileExists("BruteSSH.exe")) {
    ns.brutessh(target);
  }

  if (ns.fileExists("FTPCrack.exe")) {
    ns.ftpcrack(target);
  }

  ns.nuke(target);
}