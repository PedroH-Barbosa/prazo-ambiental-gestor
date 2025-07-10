import Database from 'better-sqlite3';
import path from 'path';


const dbPath = path.resolve(__dirname, 'data.sqlite');  

const db = new Database(dbPath);


export default db;
