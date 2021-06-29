import CustomerModel from "../models/customer.model";
import type { Customer } from "../types";

export default class CustomerController {
    public _customerModel = CustomerModel;

    public async getAll(): Promise<Customer[]> {
        return (await this._customerModel.findAll()).map(x => x.toJSON() as Customer);
    }

    public async getById(id: number): Promise<Customer | undefined> {
        const User = await this._customerModel.findOne({
            where: {
                id
            }
        });

        return User ? User.toJSON() as Customer : undefined;
    }

    public async insert(id: number, email: string) {
        const User = await this.getById(id);
        if (User) return false;
        // ref: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) return false;
        await this._customerModel.create({
            id, email: email
        });
        return true;
    }

    public async getByEmail(email: string) {
        const User = await this._customerModel.findOne({
            where: { email: email }
        });

        return User ? User.toJSON() as Customer : undefined;
    }

    public async deleteById(id: number) {
        const user = await this.getById(id);
        if (!user) return false;
        await this._customerModel.destroy({ where: { id }});
        return true;
    }

    public async deleteByEmail(email: string) {
        const user = await this.getByEmail(email);
        if (!user) return false;
        await this._customerModel.destroy({ where: { email: email }});
        return true;
    }
}