/** @param {NS} ns */
export async function main(ns) {
  // How much RAM each purchased server will have. 
  const ram = 16;

  // Iterator we'll use for our loop
  let i = 0;

  // Continuously try to purchase servers until we've reached the maximum
  // amount of servers
  while (i < ns.getPurchasedServerLimit()) {
    // Check if we have enough money to purchase a server
    let cost = ns.getPurchasedServerCost(ram);
    let money = ns.getServerMoneyAvailable("home");
    ns.print("Needed: ", cost, " Available: ", money);
    if (money > cost) {
      // If we have enough money, then:
      //  1. Purchase the server
      //  2. Copy our hacking script onto the newly-purchased server
      //  3. Run our hacking script on the newly-purchased server
      //  4. Increment our iterator to indicate that we've bought a new server
      let hostname = ns.purchaseServer("pserv-" + i, ram);
      ns.scp("batch-hacking/supervisor.js", hostname);
      ns.scp("batch-hacking/os-runner.js", hostname);
      ns.exec("batch-hacking/supervisor.js", hostname, 1, "joesguns");
      ++i;
    }
    //Make the script wait for a second before looping again.
    //Removing this line will cause an infinite loop and crash the game.
    await ns.sleep(1000);
  }
}