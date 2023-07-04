// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';
// jest.mock('.');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(10);
    expect(bankAccount.getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(10);
    expect(() => bankAccount.withdraw(15)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(10);
    const otherBankAccount = getBankAccount(5);
    expect(() => bankAccount.transfer(15, otherBankAccount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(10);
    expect(() => bankAccount.transfer(15, bankAccount)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(10);
    bankAccount.deposit(5);
    expect(bankAccount.getBalance()).toBe(15);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(10);
    bankAccount.withdraw(5);
    expect(bankAccount.getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(10);
    const otherBankAccount = getBankAccount(5);
    bankAccount.transfer(5, otherBankAccount);
    expect(otherBankAccount.getBalance()).toBe(10);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(10);
    let balance = null;
    while (balance === null) {
      balance = await bankAccount.fetchBalance();
    }
    expect(typeof balance).toBe('number');
  });

  // test('should set new balance if fetchBalance returned number', async () => {

  // });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      while (true) {
        const bankAccount = getBankAccount(10);
        await bankAccount.synchronizeBalance();
      }
    } catch (err) {
      expect(err).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
