import crypto from "crypto";
import pgp from "pg-promise";
import { validateCpf } from "./validateCpf";

export async function signup(input: any): Promise<any> {
  const connection = pgp()("postgres://db-user:1234@localhost:5432/mydb");
  try {
    const id = crypto.randomUUID();
    const [emailSaved] = await connection.query("select * from cccat17.account where email = $1", [input.email]);
    if (emailSaved) return -4;
    if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) return -3;
    if (!input.email.match(/^(.+)@(.+)$/)) return -2;
    if (!validateCpf(input.cpf)) return -1;
    if (input.isDriver) {
      if (!input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) return -5;
      await connection.query("insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
        [
          id,
          input.name,
          input.email,
          input.cpf,
          input.carPlate,
          !!input.isPassenger,
          !!input.isDriver,
        ]
      );
      return {
        accountId: id,
      };
    }
    await connection.query(
      "insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        id,
        input.name,
        input.email,
        input.cpf,
        input.carPlate,
        !!input.isPassenger,
        !!input.isDriver,
      ]
    );
    return {
      accountId: id,
    };
  } finally {
    await connection.$pool.end();
  }
}
