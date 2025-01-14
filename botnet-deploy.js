/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];

  // Array of all servers that don't need any ports opened
  // to gain root access. These have 16 GB of RAM
  const servers0Port = ["sigma-cosmetics",
    "joesguns",
    "nectar-net",
    "hong-fang-tea",
    "harakiri-sushi",
    "foodnstuff"];

  // Array of all servers that only need 1 port opened
  // to gain root access. These have 32 GB of RAM
  const servers1Port = ["neo-net",
    "zer0",
    "max-hardware",
    "iron-gym"];

  const servers2Port = ["silver-helix",
    "phantasy",
    "omega-net",
    "the-hub",
    "avmnite-02h"
  ];

  // Copy our scripts onto each server that requires 0 ports
  // to gain root access. Then use nuke() to gain admin access and
  // run the scripts.
  for (let i = 0; i < servers0Port.length; ++i) {
    const serv = servers0Port[i];

    ns.scp("batch-hacking/supervisor.js", serv);
    ns.scp("batch-hacking/os-runner.js", serv);
    ns.nuke(serv);
    ns.killall(serv);
    ns.exec("batch-hacking/supervisor.js", serv, 1, target);
  }

  // Wait until we acquire the "BruteSSH.exe" program
  while (!ns.fileExists("BruteSSH.exe")) {
    await ns.sleep(60000);
  }

  // Copy our scripts onto each server that requires 1 port
  // to gain root access. Then use brutessh() and nuke()
  // to gain admin access and run the scripts.
  for (let i = 0; i < servers1Port.length; ++i) {
    const serv = servers1Port[i];

    ns.scp("batch-hacking/supervisor.js", serv);
    ns.scp("batch-hacking/os-runner.js", serv);
    ns.brutessh(serv);
    ns.nuke(serv);
    ns.killall(serv);
    ns.exec("batch-hacking/supervisor.js", serv, 1, target);
  }

  // Crack and run botnet on lvl2 servers
  if (ns.fileExists("FTPCrack.exe")) {
    for (let i = 0; i < servers2Port.length; ++i) {
      const serv = servers2Port[i];

      ns.scp("batch-hacking/supervisor.js", serv);
      ns.scp("batch-hacking/os-runner.js", serv);
      ns.brutessh(serv);
      ns.ftpcrack(serv);
      ns.nuke(serv);
      ns.killall(serv);
      ns.exec("batch-hacking/supervisor.js", serv, 1, target);
    }
  }
}