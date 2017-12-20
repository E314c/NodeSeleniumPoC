require('yargs').option('headless',{
    alias: 'h',
    default: false
}).option('driver',{
    alias: 'd',
    choices: ['firefox', 'chrome'],
    default: 'firefox'
});


module.exports =  require('yargs').argv;
