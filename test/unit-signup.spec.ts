import axios from "axios";
import { faker } from '@faker-js/faker';
import { Signup } from "../src/app/use-cases/signup";
import { AccountDAOInterface } from "../src/infra/database/account-dao";

describe("Signup unit", () => {

  const makeAccountDAO = (): AccountDAOInterface => {
    class AccountDao implements AccountDAOInterface {
      findBy(_field: string, _value: any): Promise<any> {
        return new Promise(resolve => resolve([{
          accountId: 'any_id',
          cpf: 'any_value',
          email: 'any_mail@mail.com',
          carPlate: 'MMR9397',
          isDriver: true,
          isPassenger: false,
          name: 'any_name'
        }]))
      }
      save(_account: any): Promise<void> {
        return new Promise(resolve => resolve());
      }
    }
    return new AccountDao();
  }

  const makeSut = () => {
    const accoutnDAO = makeAccountDAO();
    const sut = new Signup(accoutnDAO);

    return {
      sut,
      accoutnDAO
    }
  }

  const validMail = faker.internet.email();

  it("Deve realizar o signup com sucesso e retornar o accountId quando for motorista", async () => {
    const { sut, accoutnDAO } = makeSut();
    jest.spyOn(accoutnDAO, 'findBy').mockReturnValueOnce(Promise.resolve(null));
    const input = {
      name: faker.person.fullName(),
      email: validMail,
      cpf: "92610445067",
      carPlate: "NAT1573",
      isDriver: true,
    };
    const output = await sut.execute(input)

    expect(output.accountId).toBeDefined();
  });

  it("Deve realizar o signup com sucesso e retornar o accountId quando for passageiro", async () => {
    const { sut, accoutnDAO } = makeSut();
    jest.spyOn(accoutnDAO, 'findBy').mockReturnValueOnce(Promise.resolve(null));
    const input = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      cpf: "92610445067",
      carPlate: "NAT1573",
      isPassenger: true,
    };

    const output = await sut.execute(input)

    expect(output.accountId).toBeDefined();
  });


  it("Deve retornar um erro caso o nome seja invalido", async () => {
    const { sut, accoutnDAO } = makeSut();
    jest.spyOn(accoutnDAO, 'findBy').mockReturnValueOnce(Promise.resolve(null));
    const input = {
      name: "1234",
      email: faker.internet.email(),
      cpf: "92610445067",
      carPlate: "NAT1573",
      isDriver: true,
    };

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new Error("Invalid name"));
  });

  it("Deve retornar um  erro caso o email seja invalido", async () => {
    const { sut, accoutnDAO } = makeSut();
    jest.spyOn(accoutnDAO, 'findBy').mockReturnValueOnce(Promise.resolve(null));
    const input = {
      name: faker.person.fullName(),
      email: "invalid-mail",
      cpf: "92610445067",
      carPlate: "NAT1573",
      isDriver: true,
    };

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new Error("Invalid email"));
  });

  it("Deve retornar um código de erro caso o CPF seja invalido", async () => {
    const { sut, accoutnDAO } = makeSut();
    jest.spyOn(accoutnDAO, 'findBy').mockReturnValueOnce(Promise.resolve(null));
    const input = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      cpf: "1",
      carPlate: "NAT1573",
      isDriver: true,
    };

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new Error("Invalid CPF"));
  });

  it("Deve retornar um código de erro caso a placa seja invalido e o seja um motorista", async () => {
    const { sut, accoutnDAO } = makeSut();
    jest.spyOn(accoutnDAO, 'findBy').mockReturnValueOnce(Promise.resolve(null));
    const input = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      cpf: "92610445067",
      carPlate: "NAT157J",
      isDriver: true,
    };

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new Error("Invalid car plate"))
  });

  it("Deve retornar um código de erro quando o email já está cadastrado", async () => {
    const { sut } = makeSut();
    const input = {
      name: faker.person.fullName(),
      email: 'Filomena_Zulauf57@yahoo.com',
      cpf: "92610445067",
      carPlate: "NAT1573",
      isDriver: true,
    };

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new Error("Email already exists"))
  });
});
