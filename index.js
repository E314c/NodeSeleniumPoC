/*
This is a quick selenium test script for Node Goat.
__IT IS NOT TO BE USED AS AN EXAMPLE OF GOOD SELENIUM TESTING IN NODEJS__
It has not been properly integrated with a framework, such as chai, nor does it contain assertions to
actually test anything.
It is purely to excerise the NodeGoat website in a automated fashion as part of a PoC.
*/
(async function (){
    const args = require('./yargs');
    const {Builder, By, Key, until} = require('selenium-webdriver');
    const chromeDriver = require('selenium-webdriver/chrome');
    const firefoxDriver = require('selenium-webdriver/firefox');

    const driverChoice = args.driver;
    console.log('Running tests with: ', driverChoice);

    //Create options:
    const TEST_WINDOW_WIDTH = 640;
    const TEST_WINDOW_HEIGHT = 480;

    const chromeOptions = new chromeDriver.Options().windowSize({width:TEST_WINDOW_WIDTH, height:TEST_WINDOW_HEIGHT});
    const firefoxOptions = new firefoxDriver.Options().windowSize({width:TEST_WINDOW_WIDTH, height:TEST_WINDOW_HEIGHT});

    if(args.headless){
        chromeOptions.headless();
        firefoxOptions.headless();
    }

    if(args.proxy){
        const firefoxProfile = new firefoxDriver.Profile();
        firefoxProfile.setPreference('network.proxy.type',1);               // set proxy config to manual
        firefoxProfile.setPreference('network.proxy.http','localhost');     // we'll proxy through localhost...
        firefoxProfile.setPreference('network.proxy.http_port', 1337);      // ..on port 1337
        firefoxProfile.setPreference('network.proxy.no_proxies_on','');     // and this applies to routes on localhost too.

        firefoxOptions.setProfile(firefoxProfile);  //Set the profile
    }


    const driver = new Builder()
        .forBrowser(driverChoice)
        .setChromeOptions(chromeOptions)
        .setFirefoxOptions(firefoxOptions)
        .build();

    // Test 1: Attempt to login with 'Bob':'a Long password'
    await driver.get('http://192.168.0.101:4000/');
    await driver.findElement(By.name('userName')).sendKeys('Bob');
    await driver.findElement(By.name('password')).sendKeys('a Long password');
    await driver.findElement(By.css('button.btn.btn-danger')).click();
    console.log('tested first url');

    //Test 2: Navigate to tutorial page
    await driver.get('http://192.168.0.101:4000/tutorial');
    console.log('Second Test');

    // Test 1: Attempt to login with 'Bob':'a Long password' and pressing enter key
    await driver.get('http://192.168.0.101:4000/');
    await driver.findElement(By.name('userName')).sendKeys('Bob');
    await driver.findElement(By.name('password')).sendKeys('a Long password', Key.RETURN);
    console.log('Third Test complete');


    //Exit the driver instance
    await driver.quit();
    //*/
})();
