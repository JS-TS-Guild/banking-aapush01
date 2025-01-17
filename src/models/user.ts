import Bank from './bank';

export default class User {
  private id: string;
  private name: string;
  private accountIds: string[];

  private constructor(id: string, name: string, accountIds: string[]) {
    this.id = id;
    this.name = name;
    this.accountIds = accountIds;
  }

  static create(name: string, accountIds: string[]): User {
    const id = crypto.randomUUID();
    const user = new User(id, name, accountIds);
    
    // Set user ID for each account
    accountIds.forEach(accountId => {
      Bank.instances.forEach(bank => {
        try {
          const account = bank.getAccount(accountId);
          account.setUserId(id);
        } catch (error) {
          // Account not found in this bank, continue to next bank
        }
      });
    });
    
    return user;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAccountIds(): string[] {
    return [...this.accountIds];
  }
}