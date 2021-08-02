import Table from "./Table";

class App extends Table {
    static getTable() {
        return window.DB.getSchema().table('app');
    }

    static all() {
        return new Promise((resolve, reject) => {
            window.DB.select(window.$DB.app.value)
                .from(window.$DB.app)
                .where(window.$DB.app.key.eq(this.getTableName()))
                .exec()
                .then((result) => {
                    if (result && result.length > 0) {
                        return resolve(result[0].value);
                    }

                    reject();
                })
                .catch(reject);
        });
    }

    static store(data) {
        return this.insertRow(window.$DB.app, {
            key: this.getTableName(),
            value: data
        });
    }

    static insert(key, value) {
        this.insertRow(window.$DB.app, {
            key: key,
            value: value
        });
    }

    static get(key) {
        const table = this.getTable();

        return new Promise((resolve, reject) => {
            window.DB.select(table.value)
                .from(table)
                .where(table.key.eq(key))
                .exec()
                .then((result) => {
                    if (result && result.length > 0) {
                        resolve(result[0].value);

                        return;
                    }

                    reject();
                })
                .catch(reject);
        });
    }
}

export default App;
