import AppTable from "./App";
import {deepClone} from "../helpers";

class Quote extends AppTable {
    static getTableName() {
        return 'quotes';
    }

    static getTable() {
        return window.DB.getSchema().table('quotes');
    }

    static all() {
        return window.DB.select()
            .from(this.getTable())
            .exec();
    }

    static async getAllDeviceOnly() {
        const table = this.getTable();

        const results = await window.DB.select()
            .from(table)
            .exec();

        return results;
    }

    static create(payload) {
        return this.insertRow(this.getTable(), payload)
    }

    
    static deleteForRecord(id) {
        const table = this.getTable();
        
        return window.DB.delete()
            .from(table)
            .where(table.id.eq(parseInt(id)))
            .exec();
    }

    static getById(id) {
        const table = this.getTable();

        return window.DB.select()
            .from(table)
            .where(table.id.eq(parseInt(id)))
            .exec();
    }

    static async update(row) {
        const table = this.getTable();

        return window.DB.insertOrReplace()
            .into(table)
            .values([table.createRow(deepClone(row))])
            .exec();
    }
}

export default Quote;