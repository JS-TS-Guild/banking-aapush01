export default class BankAccount {
    private id: string;
    private balance: number;
    private userId: string | null;
    private allowsNegativeBalance: boolean;
  
    constructor(id: string, initialBalance: number, allowsNegativeBalance: boolean = false) {
      this.id = id;
      this.balance = initialBalance;
      this.userId = null;
      this.allowsNegativeBalance = allowsNegativeBalance;
    }
  
    getId(): string {
      return this.id;
    }
  
    getBalance(): number {
      return this.balance;
    }
  
    getUserId(): string | null {
      return this.userId;
    }
  
    setUserId(userId: string): void {
      this.userId = userId;
    }
  
    deposit(amount: number): void {
      if (amount <= 0) {
        throw new Error('Invalid amount');
      }
      this.balance += amount;
    }
  
    withdraw(amount: number): void {
      if (amount <= 0) {
        throw new Error('Invalid amount');
      }
      if (!this.allowsNegativeBalance && this.balance - amount < 0) {
        throw new Error('Insufficient funds');
      }
      this.balance -= amount;
    }
  }  