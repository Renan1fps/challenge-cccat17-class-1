import express from "express";
import { AccountDAO } from "../infra/database/account-dao";
import { Signup } from "../app/use-cases/signup";
import { GetAccount } from "../app/use-cases/get-account";

const httpServer = express();
httpServer.use(express.json())

httpServer.post('/signup', async (req, res) => {
    try {
        const accountDAO = AccountDAO.getInstance();
        const signup = new Signup(accountDAO);
        const response = await signup.execute(req.body);
        res.status(200).json(response);
    } catch (err: any) { 
        res.status(400).json({ message: err.message })
    }
});

httpServer.get('/accounts/:id', async (req, res) => {
    try {
        const accountDAO = AccountDAO.getInstance();
        const getAccount = new GetAccount(accountDAO);        
        const response = await getAccount.execute(req.params.id);
        res.status(200).json(response);
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
});

httpServer.listen(3000, '', () => console.log('Server running'));