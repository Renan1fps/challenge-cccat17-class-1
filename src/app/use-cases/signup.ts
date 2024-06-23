import crypto from "crypto";
import { AccountDAOInterface } from "../../infra/database/account-dao";
import { validateCpf } from "../../old_validateCpf";

export class Signup {

  constructor(readonly accountDAO: AccountDAOInterface) { }

  async execute(input: InputSignup): Promise<{ accountId: string }> {
    const id = crypto.randomUUID();
    const emailSaved = await this.accountDAO.findBy('email', input.email);
    if (emailSaved) throw new Error("Email already exists");
    if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name");
    if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
    if (!validateCpf(input.cpf)) throw new Error("Invalid CPF");
    if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid car plate");
    await this.accountDAO.save({ ...input, isPassenge: !!input.isPassenger, isDriver: !!input.isDriver, accountId: id, });
    return {
      accountId: id,
    };
  }
}

export type InputSignup = {
  name: string;
  email: string;
  cpf: string;
  carPlate: string;
  isPassenger?: boolean;
  isDriver?: boolean;
}