import { AccountDAOInterface } from "../../infra/database/account-dao";

export class GetAccount {

    constructor(readonly accountDAO: AccountDAOInterface) { }
  
    async execute(accountId: string): Promise<OutputAccount> {
      const account = await this.accountDAO.findBy('account_id', accountId);
      return {
        accountId: account.account_id,
        cpf: account.cpf,
        email: account.email,
        carPlate: account.car_plate,
        isDriver: account.is_driver,
        isPassenger: account.is_passenger,
        name: account.name,
      };
    }
  }
  
  export type OutputAccount = {
    accountId: string;
    name: string;
    email: string;
    cpf: string;
    carPlate: string;
    isPassenger: boolean;
    isDriver: boolean;
  }