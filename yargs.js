require('yargs').option('headless',{
    alias: 'h',
    default: false
}).option('driver',{
    alias: 'd',
    choices: ['firefox', 'chrome'],
    default: 'firefox'
}).option('proxy',{
    alias: 'p',
    default: true
});


module.exports =  require('yargs').argv;
