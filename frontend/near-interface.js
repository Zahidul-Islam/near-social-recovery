/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class SocialRecovery {
  constructor({ contractId, walletToUse }) {
    console.log(walletToUse);
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getAllGuardians() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "getAllGuardiants",
      args: { account: this.wallet.accountId },
    });
  }

  // async setGreeting(greeting) {
  //   return await this.wallet.callMethod({
  //     contractId: this.contractId,
  //     method: "set_greeting",
  //     args: { message: greeting },
  //   });
  // }
}
