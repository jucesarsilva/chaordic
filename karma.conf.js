//jshint strict: false
module.exports = function(config) {
  config.set({

        basePath: './',

        files: [
            'js/app.js',
            'js/core.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],
        
        reporters: ['mocha'],
      
        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-mocha-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },
      
        mochaReporter: {
            colors: {
                success: 'blue',
                info: 'bgGreen',
                warning: 'cyan',
                error: 'bgRed'
            },
            symbols: {
                success: '+',
                info: '#',
                warning: '!',
                error: 'x'
            }
        }

  });
};
