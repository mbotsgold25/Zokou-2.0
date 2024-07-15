const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1BHdlRkbTZMMmRxblFJWjJGWUdQK3VVTWFBbHJBTWh6djFUd2FlbWJIbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicEtiK05uNHJPWmJMdXhBV2VCZjNENDh3ekllWFYyMjhsZG5DUTdIK0lRST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHUE02YlpYRENkek5VRjRUSlhITGF4L2E0SFF3UlFrek5rY1BSamFhN0Y4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSZWlwdWxPTUdPaEROZ1dybW9NZHBLTWl6MUdEZ0NqY2txcm1KakNpMzA4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNQZkM4b2p1UjJhSU5jUUJ5Y29yTzJnbDBnSDI0NmRLNEFobHM3QWRqVUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpGSHkxako5aEkyUHBScE0xcHFRcStWSlpnLzF6QldOOFVWZUdHazViRVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkVqOHpSZTJKYkFmNDBoQkswR24vSExJQ0RFQ1A1MkRZY3NncElGSDVVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVl4eUFuSE5NeUVpTmZDSzRZY3gzQzMxY3QxQ3pBcnAzMWpEZFdVQThWTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpJa1pUZ2Z0TmRVbFM4bk1PWkxPbUx3Nk8wRFgrQnNNMTVKM2M1V3NxWVoyWFJjREY1dGxKU21lNFhQK0NCVjIzNVhORTFLOXUrR25MNk1nRmJzK0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY2LCJhZHZTZWNyZXRLZXkiOiIzbXB2aTdOSCtRNm12V0FkazFSN0cvM2JlaG5XZUZCNlBFUkcySytlNGs4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiVjlCS182Tk5RS2l0WmZsRDR1WnYxZyIsInBob25lSWQiOiJhZmZjNDI3ZS02OWFiLTQyOWMtODBiNy00YjQzMTIwOWQyN2EiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZkhjaW1hbUMrQ2NSYnR3bDVFMXJQM29HdmVrPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZIblVzTk50cWx5aWN2MTJNRzFmOU1ja2VKMD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJZNkdTRTRZViIsIm1lIjp7ImlkIjoiMjEyNzIyMDU1MDExOjQxQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJbjlpSVFIRU5uUDA3UUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJRVkxidW9lSE1qZFg1OTVzaS9abmZVUHQ5QXMzd010TzQ1ZjVjcXlYWlNZPSIsImFjY291bnRTaWduYXR1cmUiOiJkVTNGWHppWDVDRGo0ZEljUXJudXJHemhjTUE4ZkZPYkpjWmRpL1l1ZkhzVG9YNWhITUFHbEVrVUZiSm5JWUYvTndPL29nV21rTFdQdWtJSUxkbnRDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRmN1UmliTGlETm5xWWtDNUxma3p3MHo4c0JZZHQwSWh0eXVySGt4aFpwaXpvYjBxdjlnVXBoNHRrQmthelpsV3IvYmlDK0lYM2wyVjFPSFY2bSswQ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMTI3MjIwNTUwMTE6NDFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVUZTMjdxSGh6STNWK2ZlYkl2MlozMUQ3ZlFMTjhETFR1T1grWEtzbDJVbSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Mbots Gold",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Mbots Gold',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
