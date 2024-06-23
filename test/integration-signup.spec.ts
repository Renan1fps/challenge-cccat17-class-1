import axios from "axios";
import { faker } from '@faker-js/faker';

axios.defaults.validateStatus = function () {
	return true;
}

describe("Signup integration", () => {

  const validMail = faker.internet.email();

  it("Deve realizar o signup com sucesso e retornar o accountId quando for motorista", async () => {
    const input = {
      name: faker.person.fullName(),
      email: validMail,
      cpf: "92610445067",
      carPlate: "NAT1573",
      isDriver: true,
    };

    const { data: responseSignup} = await axios.post('http://localhost:3000/signup', input);
    const { data: responseGetAccount} = await axios.get(`http://localhost:3000/accounts/${responseSignup.accountId}`);

    expect(responseSignup.accountId).toEqual(responseGetAccount.accountId);
  });

  it("Deve realizar o signup com sucesso e retornar o accountId quando for passageiro", async () => {
    const input = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      cpf: "92610445067",
      isPassenger: true,
    };

    const { data: responseSignup} = await axios.post('http://localhost:3000/signup', input);
    const { data: responseGetAccount} = await axios.get(`http://localhost:3000/accounts/${responseSignup.accountId}`);

    expect(responseSignup.accountId).toEqual(responseGetAccount.accountId);
  });

  it("Deve retornar um erro quando o email já está cadastrado", async () => {
    const input = {
      name: faker.person.fullName(),
      email: validMail,
      cpf: "92610445067",
      carPlate: "NAT1573",
      isDriver: "true",
    };

    const res = await axios.post('http://localhost:3000/signup', input);

    expect(res.data.message).toBe('Email already exists');
    expect(res.status).toBe(400);
  });
});
