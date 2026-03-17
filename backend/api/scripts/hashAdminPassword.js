const { hashPassword } = require('../utils/password');

const password = process.argv[2];

if (!password) {
    console.error('Usage: node scripts/hashAdminPassword.js "<mot_de_passe>"');
    process.exit(1);
}

try {
    console.log(hashPassword(password));
} catch (error) {
    console.error(error.message);
    process.exit(1);
}
