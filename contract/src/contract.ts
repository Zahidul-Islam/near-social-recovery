import {
  NearBindgen,
  near,
  call,
  view,
  initialize,
  UnorderedMap,
} from "near-sdk-js";

function require(statement, message) {
  if (!statement) {
    throw Error(`Assert failed: ${message}`);
  }
}

class Recovery {
  proposedOwner: string;
  recoveryRound: number;
  usedInExecuteRecovery: boolean;

  constructor({
    proposedOwner,
    recoveryRound,
    usedInExecuteRecovery,
  }: {
    proposedOwner: string;
    recoveryRound: number;
    usedInExecuteRecovery: boolean;
  }) {
    this.proposedOwner = proposedOwner;
    this.recoveryRound = recoveryRound;
    this.usedInExecuteRecovery = usedInExecuteRecovery;
  }
}

@NearBindgen({})
class SocialRecovery {
  isGuardian: UnorderedMap = new UnorderedMap("isGuardian");
  guardianToRecovery: UnorderedMap = new UnorderedMap("guardianToRecovery");
  threshold: number;
  owner: string;
  currRecoveryRound: number = 0;
  inRecovery: boolean = false;
  kek: string; //key-encryption-key

  @initialize({})
  init({
    guardianAccounts,
    threshold,
  }: {
    guardianAccounts: [string];
    threshold: number;
  }) {
    require(threshold <= guardianAccounts.length, "threshold too high");
    require(near.currentAccountId() ===
      near.predecessorAccountId(), `Account ${near.predecessorAccountId()} don't have permission to change the owner`);

    for (let account of guardianAccounts) {
      require(!this.isGuardian.get(account), "duplicate guardian");

      this.isGuardian.set(account, true);
    }

    this.threshold = threshold || 0;
    this.owner = near.predecessorAccountId();
  }

  @call({})
  initiateRecovery({ proposedOwner }: { proposedOwner: string }) {
    this.currRecoveryRound++;
    this.guardianToRecovery.set(
      near.predecessorAccountId(),
      new Recovery({
        proposedOwner,
        recoveryRound: this.currRecoveryRound,
        usedInExecuteRecovery: false,
      })
    );

    this.inRecovery = true;
    near.log(
      `${near.predecessorAccountId()} initiate a wallet recovery for ${proposedOwner}. Current recover round: ${
        this.currRecoveryRound
      }`
    );
  }

  @call({})
  supportRecovery({ proposedOwner }: { proposedOwner: string }) {
    require(this.inRecovery, "Wallet must already be in recovery mode");
    this.guardianToRecovery.set(
      near.predecessorAccountId(),
      new Recovery({
        proposedOwner,
        recoveryRound: this.currRecoveryRound,
        usedInExecuteRecovery: false,
      })
    );

    near.log(
      `${near.predecessorAccountId()} support a wallet recovery for ${proposedOwner}. Current recover round: ${
        this.currRecoveryRound
      }`
    );
  }

  @call({})
  executeRecovery({
    newOwner,
    guardianList,
  }: {
    newOwner: string;
    guardianList: [string];
  }) {
    near.log("==> ", guardianList.length);
    near.log("==> ", this.currRecoveryRound);
    require(guardianList.length >=
      this.currRecoveryRound, "more guardians required to transfer ownership");

    for (let guardian of guardianList) {
      const recovery = this.guardianToRecovery.get(guardian) as Recovery;

      require(recovery.recoveryRound ==
        this.currRecoveryRound, "round mismatch");
      require(recovery.proposedOwner == newOwner, "disagreement on new owner");
      require(!recovery.usedInExecuteRecovery, "duplicate guardian used in recovery");

      near.log("==> ", recovery);
      near.log("==> ", recovery.recoveryRound);
      recovery.usedInExecuteRecovery = true;
    }

    this.inRecovery = false;
    this.owner = newOwner;

    near.log(
      "==> ",
      this.owner,
      this.inRecovery,
      this.guardianToRecovery.toArray()
    );
  }

  @view({})
  getAllGuardiants() {
    const kek = near.randomSeed().toString();
    near.log("==> ", kek.length, kek);
    return this.isGuardian.toArray();
  }
}
