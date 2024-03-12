const yargs = require('yargs');
const user = require('./user');

yargs.command({
    command: 'add',
    describe: 'Add a new language',
    builder: {
        title: {
            describe: 'Language title',
            demandOption: true,
            type: 'string',
        },
        level: {
            describe: 'Language level',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        user.addLanguage(argv.title, argv.level);
    },
});

yargs.command({
    command: 'view',
    describe: 'View all languages',
    handler() {
        user.viewLanguages();
    },
});

yargs.command({
    command: 'remove',
    describe: 'Remove a language',
    builder: {
        title: {
            describe: 'Language title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        user.removeLanguage(argv.title);
    },
});

yargs.parse();
