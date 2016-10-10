module.exports = {
  include: [
          {
      src: 'src/assets/',
      dest: 'www/assets/'
    },
    {
      src: 'src/index.html',
      dest: 'www/index.html'
    },
    {
      src: 'src/service-worker.js',
      dest: 'www/service-worker.js'
    },
    {
      src: 'node_modules/ionic-angular/polyfills/polyfills.js',
      dest: 'www/build/polyfills.js'
    },
    {
      src: 'node_modules/ionicons/dist/fonts/',
      dest: 'www/assets/fonts/'
    },
    {
      src: 'node_modules/json-formatter-js/dist/json-formatter.js',
      dest: 'www/build/json-formatter.js'
    },
    {
      src: 'node_modules/json-formatter-js/dist/json-formatter.js.map',
      dest: 'www/build/json-formatter.js.map'
    },
    {
      src: 'node_modules/pdfjs-dist/build/pdf.js',
      dest: 'www/build/pdf.js'
    },
    {
      src: 'node_modules/pdfjs-dist/build/pdf.worker.js',
      dest: 'www/build/pdf.worker.js'
    }
  ]
};