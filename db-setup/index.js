const DatabaseService = require('../server/services/database.service');
const db = new DatabaseService();

const expoertCollection = db.create('exports');
console.log('\nCreating new collection "exports" ');

const adminsCollection = db.get('admins', { castIds: false});
adminsCollection.createIndex( { email: 1 }, { unique: 1 });
adminsCollection.createIndex( { username: 1 }, { unique: 1 });

console.log('\nCreating new collection "admins" ');

const sampleAdmin = {
  email: 'hive@admin.com',
  username: 'hive_admin',
  password: 'hive1234',
  profile: {
    firstName: 'Hive',
    lastName: 'Admin',
  }
}

adminsCollection.insert(sampleAdmin)
.then(
  (admin) => {
    console.log(`Sample admin user added, email: ${admin.email}, password: ${sampleAdmin.password}`);
  }
)
.then(
  () => {
    db.close();
  }
)
.catch(
  (error) => {
    console.log('\nError:');
    console.error(error);
    db.close();
  }
)
