import lf from "lovefield";

class CreateDatabase {
    constructor() {
        var dateForVersion = 1;
        this.schemaBuilder = lf.schema.create('proverba_db', dateForVersion);
    }

    async boot() {
        try {
            await this.migrate();
            await this.connect();
        } catch (e) {
            console.log(e);
        }
    }

    async migrate() {
        await this.createAppDataTable();

        await this.createQuotesTable();
        await this.createTagsTable();
    }

    connect() {
        this.schemaBuilder.connect().then((DB) => {
            window.DB = DB;
            window.$DB = {};
            window.$DB.app = DB.getSchema().table('app');

            this.connectDone();
        });
    }

    async createAppDataTable() {
        this.schemaBuilder.createTable('app')
            .addColumn('key', lf.Type.STRING)
            .addColumn('value', lf.Type.OBJECT)
            .addPrimaryKey(['key']);
    }

    async createQuotesTable() {
        this.schemaBuilder.createTable('quotes')
            .addColumn('id', lf.Type.INTEGER)
            .addColumn('description', lf.Type.STRING)
            .addColumn('emphasys_description', lf.Type.STRING)
            .addColumn('post_slug', lf.Type.STRING)
            .addColumn('seen', lf.Type.BOOLEAN)

            .addNullable([
                'post_slug',
                'seen'
            ])

            .addPrimaryKey(['id'], true)
    }

    async createTagsTable() {
        this.schemaBuilder.createTable('tags')
            .addColumn('text', lf.Type.STRING)
            .addColumn('order', lf.Type.INTEGER)

            .addNullable([
                'order',
            ])

            .addPrimaryKey(['text'], false)
    }

    connectDone() {
        console.log('DB connected succesfully!')
    }
}

export default CreateDatabase;
