import { signup } from "../src/signup";

describe("Signup", () => {
  it("Deve realizar o signup com sucesso e retornar o accountId quando for motorista", async () => {
    const input = {
      name: "john doe",
      email: "driver_mail@gmail.com",
      cpf: "92610445067",
      carPlate: "NAT1573",
      isDriver: "true",
    };
    const reponseSignup = await signup(input);

    expect(reponseSignup.accountId).toBeDefined();
  });

  it("Deve realizar o signup com sucesso e retornar o accountId quando for passageiro", async () => {
    const input = {
      name: "john doe",
      email: "passenger_mail@gmail.com",
      cpf: "92610445067",
      carPlate: "NAT1573",
      isPassenger: "true",
    };
    const reponseSignup = await signup(input);

    expect(reponseSignup.accountId).toBeDefined();
  });

  it("Deve retornar um código de erro caso o nome seja invalido", async () => {
    const input = {
      name: "1234",
      email: "any_mail@gmail.com",
      cpf: "92610445067",
      carPlate: "NAT1573",
      isPassenger: "false",
      isDriver: "true",
    };
    const reponseSignup = await signup(input);

    expect(reponseSignup).toBe(-3);
  });

  it("Deve retornar um código de erro caso o email seja invalido", async () => {
    const input = {
      name: "john doe",
      email: "invalid-mail",
      cpf: "92610445067",
      carPlate: "NAT1573",
      isPassenger: "false",
      isDriver: "true",
    };
    const reponseSignup = await signup(input);

    expect(reponseSignup).toBe(-2);
  });

  it("Deve retornar um código de erro caso o CPF seja invalido", async () => {
    const input = {
      name: "john doe",
      email: "any_mail@gmail.com",
      cpf: "1",
      carPlate: "NAT1573",
      isPassenger: "false",
      isDriver: "true",
    };
    const reponseSignup = await signup(input);

    expect(reponseSignup).toBe(-1);
  });

  it("Deve retornar um código de erro caso a placa seja invalido e o seja um motorista", async () => {
    const input = {
      name: "john doe",
      email: "any_mail@gmail.com",
      cpf: "92610445067",
      carPlate: "NAT157J",
      isPassenger: "false",
      isDriver: "true",
    };
    const reponseSignup = await signup(input);

    expect(reponseSignup).toBe(-5);
  });

  it("Deve retornar um código de erro quando o emial já está cadastrado", async () => {
    const input = {
      name: "john doe",
      email: "driver_mail@gmail.com",
      cpf: "92610445067",
      carPlate: "NAT1573",
      isDriver: "true",
    };
    const reponseSignup = await signup(input);

    expect(reponseSignup).toBe(-4)
  });
});
