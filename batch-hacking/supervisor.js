/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  const hostname = ns.getHostname();
  const moneyThresh = ns.getServerMaxMoney(target);
  const securityThresh = ns.getServerMinSecurityLevel(target);
  const delayVal = 30;

  while (true) {
    let maxRam = ns.getServerMaxRam(hostname);
    let usedRam = ns.getServerUsedRam(hostname);
    let available = ns.getServerMoneyAvailable(target);
    let secLev = ns.getServerSecurityLevel(target);
    let hackTime = ns.getHackTime(target);
    let growTime = ns.getGrowTime(target);
    let weakenTime = ns.getWeakenTime(target);

    //                    |= hack ====================|
    // |=weaken 1======================================|
    //                |= grow ==========================|
    //   |=weaken 2======================================|
    // |=Toal=time=====weaken+delayVal===================|
    // 20ms delay between scripts min

    let runDuration = weakenTime + delayVal * 3;
    let hackDelay = weakenTime - delayVal - hackTime;
    let growDelay = weakenTime - growTime - delayVal;
    let hackTarget = available >= moneyThresh && secLev <= securityThresh;
    let hackThreads = 1;
    let growThreads = 1;
    let weakenThreads = 2;

    // Batching system requires 16GB to run normally, past this we can scale
    if (maxRam > 16) {
      const oneShotRAM = 2;
      const supervisorRAM = 3.6; // Calculate this eventually
      let freeRam = maxRam - usedRam;
      let osThreads = Math.floor((freeRam / oneShotRAM) / 4); // Giving each OS an equal number of threads 
      // ns.print(maxRam, " max");
      // ns.print(usedRam, " used");
      // ns.print(freeRam, " free");
      // ns.print(osThreads, " Threads");
      if (hackTarget) {
        hackThreads = osThreads;
        growThreads = osThreads;
        weakenThreads = osThreads;
      } else {
        hackThreads = 0;
        let lefoverThreads = Math.floor(osThreads / 3);
        // ns.print(lefoverThreads, " leftover");
        growThreads = osThreads + lefoverThreads;
        weakenThreads = osThreads + lefoverThreads;
        // ns.print(weakenThreads, " used threads");

      }
    }

    if (hackTarget) {
      ns.exec("batch-hacking/os-runner.js", hostname, hackThreads, "hack", target, hackDelay);
    }
    ns.exec("batch-hacking/os-runner.js", hostname, growThreads, "grow", target, growDelay);
    ns.exec("batch-hacking/os-runner.js", hostname, weakenThreads, "weaken", target);
    ns.exec("batch-hacking/os-runner.js", hostname, weakenThreads, "weaken", target, delayVal * 2);

    await ns.sleep(runDuration);
  }

}