import BankAccount from './bank-account';

export default class Bank {
  private static instances: Map<string, Bank> = new Map();
  private id: string;
  private accounts: Map<string, BankAccount>;
  private allowsNegativeBalance: boolean;

  private constructor(id: string, allowsNegativeBalance: boolean = false) {
    this.id = id;
    this.accounts = new Map();
    this.allowsNegativeBalance = allowsNegativeBalance;
  }

  static create(allowsNegativeBalance: boolean = false): Bank {
    const id = crypto.randomUUID();
    const bank = new Bank(id, allowsNegativeBalance);
    Bank.instances.set(id, bank);
    return bank;
  }

  getId(): string {
    return this.id;
  }

  createAccount(initialBalance: number): BankAccount {
    const account = new BankAccount(crypto.randomUUID(), initialBalance, this.allowsNegativeBalance);
    this.accounts.set(account.getId(), account);
    return account;
  }

  getAccount(accountId: string): BankAccount {
    const account = this.accounts.get(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  }

  send(fromUserId: string, toUserId: string, amount: number, toBankId?: string): void {
    const toBank = toBankId ? Bank.instances.get(toBankId) : this;
    if (!toBank) {
      throw new Error('Destination bank not found');
    }

    // Find source accounts in priority order
    const fromAccounts = Array.from(this.accounts.values())
      .filter(account => account.getUserId() === fromUserId);

    if (fromAccounts.length === 0) {
      throw new Error('No accounts found for source user');
    }

    // Find destination account
    const toAccount = Array.from(toBank.accounts.values())
      .find(account => account.getUserId() === toUserId);

    if (!toAccount) {
      throw new Error('Destination account not found');
    }

    // Try each account until we find one with sufficient funds or that allows negative balance
    let success = false;
    for (const fromAccount of fromAccounts) {
      try {
        fromAccount.withdraw(amount);
        toAccount.deposit(amount);
        success = true;
        break;
      } catch (error) {
        if (error.message === 'Insufficient funds' && fromAccounts.indexOf(fromAccount) < fromAccounts.length - 1) {
          // Try next account
          continue;
        }
        throw error;
      }
    }

    if (!success) {
      throw new Error('Insufficient funds in all accounts');
    }
  }
}