if (process.env.NODE_ENV !== 'production')
        require('dotenv').config();

const username_db = process.env.USERNAME_DB;
const password_db = process.env.PASSWORD_DB;
const hostlist_db = process.env.HOSTLIST_DB;
const database_db = process.env.DATABASE_DB;
const authSource_db = process.env.AUTHSOURCE_DB;

module.exports = {
	url_db: `mongodb+srv://${username_db}:${password_db}@${hostlist_db}.mongodb.net/${database_db}?authSource=${authSource_db}`
}
