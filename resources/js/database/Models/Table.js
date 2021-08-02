class Table {
    static all() {
        return window.DB.select()
            .from(this.getTable())
            .exec();
    }

    static allSorted() {
        const table = this.getTable();

        return window.DB.select()
            .from(table)
            .orderBy(table.display_order)
            .exec();
    }

    static allWithObserver(observer) {
        const query = window.DB.select()
            .from(this.getTable());

        window.DB.observe(query, observer);

        return query.exec();
    }

    static find(id) {
        const table = this.getTable();

        return window.DB.select()
            .from(table)
            .where(table.id.eq(parseInt(id, 10)))
            .exec();
    }

    static closeObserver(observer) {
        const query = window.DB.select()
            .from(this.getTable());

        window.DB.unobserve(query, observer);
    }

    static insertRow(table, object) {
        let row = table.createRow(object);

        return window.DB.insertOrReplace().into(table).values([row]).exec();
    }

    static insertRows(table, array) {
        let rows = [];

        for (let item of array) {
            let row = table.createRow(item);

            rows.push(row);
        }

        return window.DB.insertOrReplace().into(table).values(rows).exec();
    }

    static createBatch(items) {
        const table = this.getTable();
        const rows = [];

        items.forEach((item) => {
            rows.push(table.createRow(item));
        });

        return window.DB.insertOrReplace()
            .into(table)
            .values(rows)
            .exec();
    }

    static getByServerId(id) {
        const table = this.getTable();

        return window.DB.select()
            .from(table)
            .where(table.id.eq(parseInt(id, 10)))
            .exec();
    }

    static getByServerIds(ids) {
        const table = this.getTable();

        return window.DB.select()
            .from(table)
            .where(table.id.in(ids))
            .exec();
    }

    static create(item) {
        return this.insertRow(this.getTable(), item);
    }

    static update(item) {
        return this.create(item);
    }

    static remove(localId) {
        const table = this.getTable();

        return window.DB.delete()
            .from(table)
            .where(table.local_id.eq(parseInt(localId, 10)))
            .exec();
    }

    static deleteAll() {
        const table = this.getTable();

        return window.DB.delete()
            .from(table)
            .exec();
    }

    static deleteByServerId(id) {
        const table = this.getTable();

        return window.DB.delete()
            .from(table)
            .where(table.id.eq(parseInt(id, 10)))
            .exec();
    }

    static getByProjectId(projectId) {
        const table = this.getTable();

        return window.DB.select()
            .from(table)
            .where(table.project_id.eq(parseInt(projectId, 10)))
            .exec();
    }

    static removeByProjectId(projectId) {
        const table = this.getTable();

        return window.DB.delete()
            .from(table)
            .where(table.project_id.eq(parseInt(projectId, 10)))
            .exec();
    }

    static getByLocalId(localId) {
        const table = this.getTable();

        return window.DB.select()
            .from(table)
            .where(table.local_id.eq(parseInt(localId, 10)))
            .exec();
    }

    static getByIds(ids) {
        const table = this.getTable();

        return window.DB.select()
            .from(table)
            .where(table.id.in(ids))
            .exec();
    }

    // static getForTrench(trenchServerId) {
    //     const table = this.getTable();

    //     return window.DB.select()
    //         .from(table)
    //         .where(table.trench_id.eq(parseInt(trenchServerId, 10)))
    //         .exec();
    // }

    static removeAllIds(ids) {
        const table = this.getTable();

        return window.DB.delete()
            .from(table)
            .where(table.id.in(ids))
            .exec();
    }
}

export default Table;
