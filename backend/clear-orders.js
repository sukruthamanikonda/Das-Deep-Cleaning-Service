const db = require('./db');

db.run('DELETE FROM orders', function (err) {
    if (err) {
        console.error('Error deleting orders:', err);
    } else {
        console.log('All orders deleted successfully');
    }
    process.exit(0);
});
