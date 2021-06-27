import CustomerModel from "../models/customer.model";
import type { Customer } from "../types";

export default class CustomerController {
    public _customerModel = CustomerModel;

    /**
     * Retrieves all customer data from database.
     * 
     * @returns {import("../types").Customer[]} - An array of customer.
     */
    public async getAll(): Promise<Customer[]> {
        return (await this._customerModel.findAll()).map(x => x.toJSON() as Customer);
    }

    /**
     * Get customer detail with telegram user id.
     * 
     * @param id - A telegram user id
     * @returns {import("../types").Customer | undefined} - Will return undefined if user doesn't exist in database and will return customer detail if any.
     */
    public async getById(id: number): Promise<Customer | undefined> {
        const User = await this._customerModel.findOne({
            where: {
                id
            }
        });

        return User ? User.toJSON() as Customer : undefined;
    }

    /**
     * Add new user to the database.
     * 
     * @param id - A telegram user id
     * @param email - Customer email want to register
     */
    public async insert(id: number, email: string) {
        const User = await this.getById(id);
        if (User) return false;
        // ref: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) return false;
        await this._customerModel.create({
            id, email
        });
        return true;
    }

    /**
     * Get customer detail with email
     * 
     * @param email - Customer email
     * @returns {import("../types").Customer | undefined} - Will return customer detail if any and will return undefined when user doesn't exist
     */
    public async getByEmail(email: string) {
        const User = await this._customerModel.findOne({
            where: { email }
        });

        return User ? User.toJSON() as Customer : undefined;
    }

    /**
     * Delete customer row in database with id
     * 
     * @param id - A telegram user id
     * @returns {Boolean} - Will return true if success and false if failure.
     */
    public async deleteById(id: number) {
        const user = await this.getById(id);
        if (!user) return false;
        await this._customerModel.destroy({ where: { id }});
        return true;
    }

    /**
     * Delete customer row in database with email
     * 
     * @param email - Customer email
     * @returns {Boolean} - if success will return true and false if failure.
     */
    public async deleteByEmail(email: string) {
        const user = await this.getByEmail(email);
        if (!user) return false;
        await this._customerModel.destroy({ where: { email }});
        return true;
    }
}