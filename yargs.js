require('yargs').option('headless',{
    alias: 'h',
    default: false
}).option('driver',{
    alias: 'd',
    choices: ['firefox', 'chrome'],
    default: 'firefox'
}).option('goatHost',{
    default: 'http://localhost:4000'
}).option('proxy',{
    alias: 'p',
    default: false
});


module.exports =  require('yargs').argv;
