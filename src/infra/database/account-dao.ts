import pgp from "pg-promise";

export interface AccountDAOInterface{
    findBy(field: string, value: any): Promise<any>;
    save(account: any): Promise<void>;
}

export class AccountDAO implements AccountDAOInterface{
    private readonly connection;
    private static _instance: AccountDAO;

    private constructor(){
        this.connection = pgp()("postgres://db-user:1234@localhost:5432/mydb");
    }

    static getInstance(): AccountDAO {
        if(!this._instance){
            this._instance = new AccountDAO();
            return this._instance;
        }
        return this._instance;
    }

    async save(account: any): Promise<void> {
        await this.connection.query("insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [account.accountId, account.name, account.email, account.cpf, account.carPlate, !!account.isPassenger, !!account.isDriver]);
    }

    async findBy(field: string, value: any): Promise<any> {
        const [account] = await  this.connection.query(`select * from cccat17.account where ${field} = $1`, [value]);
        return account;
    }
}