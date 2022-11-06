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
  threshold: number = 1;
  owner: string = "";
  currRecoveryRound: number = 0;
  inRecovery: boolean = false;
  kek: string = ""; //key-encryption-key
  abc: string = "";

  @initialize({})
  init({
    owner,
    guardianAccounts,
    threshold,
    kek,
  }: {
    owner: string;
    guardianAccounts: [string];
    threshold: number;
    kek: string;
  }) {
    require(threshold <= guardianAccounts.length, "threshold too high");
    require(near.currentAccountId() ===
      near.predecessorAccountId(), `Account ${near.predecessorAccountId()} don't have permission to change the owner`);

    for (let account of guardianAccounts) {
      require(!this.isGuardian.get(account), "duplicate guardian");

      this.isGuardian.set(account, true);
    }

    this.threshold = threshold;
    this.kek = kek;
    this.owner = owner;
  }

  @call({})
  initiateRecovery({ proposedOwner }: { proposedOwner: string }) {
    this.currRecoveryRound++;
    this.guardianToRecovery.set(
      near.predecessorAccountId(),
      new Recovery({
        proposedOwner,
        recoveryRound: this.currRecoveryRound,
        usedInExecuteRecovery: true,
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
        usedInExecuteRecovery: true,
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
    require(guardianList.length >=
      this.currRecoveryRound, "more guardians required to transfer ownership");

    for (let guardian of guardianList) {
      const recovery = this.guardianToRecovery.get(guardian) as Recovery;

      require(recovery.recoveryRound ==
        this.currRecoveryRound, "round mismatch");
      require(recovery.proposedOwner == newOwner, "disagreement on new owner");
      require(recovery.usedInExecuteRecovery, "duplicate guardian used in recovery");
    }

    this.inRecovery = false;
    this.owner = newOwner;

    near.log(`Execute a wallet recovery and set a new owner: ${this.owner}`);
  }

  @call({})
  removeGuardian({ account }: { account: string }) {
    require(this.isGuardian.get(account), "no guardian exist");

    this.isGuardian.set(account, false);
    near.log(`Guardian ${account} was removed`);
  }

  @call({})
  addGuardian({ account }: { account: string }) {
    require(!this.isGuardian.get(account), "duplicate guardian");

    this.isGuardian.set(account, true);
    near.log(`Guardian ${account} was added`);
  }

  @call({})
  transferGuardianship({ newGuardian }: { newGuardian: string }) {
    const guardian = near.predecessorAccountId();
    require(this.isGuardian.get(guardian), "no guardian exist");

    this.isGuardian.set(guardian, false);
    near.log(`Guardian ${guardian} was removed`);
    this.isGuardian.set(newGuardian, true);
    near.log(`Guardian ${guardian} was added`);
  }

  @call({})
  transferOwnership({
    newOwner,
    oldOwner,
  }: {
    newOwner: string;
    oldOwner: string;
  }) {
    require(this.owner ===
      oldOwner, `Account ${near.predecessorAccountId()} don't have permission to transferOwnership`);
    this.owner = newOwner;
    this.abc = newOwner;
    near.log("==> ", newOwner, this.owner, this.abc);
  }

  @call({})
  cancelRecovery() {
    require(near.currentAccountId() ===
      near.predecessorAccountId(), `Account ${near.predecessorAccountId()} don't have permission to cancelRecovery`);

    this.inRecovery = false;
    near.log(
      "Allows the owner to cancel a wallet recovery (assuming they recovered private keys)"
    );
  }

  @call({})
  updateKey({ key }: { key: string }) {
    this.kek = key;
    near.log(
      `User ${near.currentAccountId()} updated the key: ${this.kek} ==> ${key}`
    );
  }

  @view({})
  getKey() {
    return this.kek;
  }

  @view({})
  getAllGuardiants({ account }: { account: string }) {
    require(this.owner ===
      account, `Account ${account} don't have permission to getAllGuardiants`);
    return this.isGuardian.toArray();
  }

  @view({})
  logData() {
    near.log("===> ", this.owner, this.threshold, this.abc);
    return {
      owner: this.owner,
      guardians: this.isGuardian.toArray(),
      inRecovery: this.inRecovery,
      kek: this.kek,
      //accountId: near.predecessorAccountId(),
    };
  }
}
