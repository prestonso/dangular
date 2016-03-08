System.defaultJSExtensions = true;

System.config({
  baseURL: '/profiles/dangular/modules/custom/angular',
  map: {
    angular2: 'node_modules/angular2',
    rxjs: 'node_modules/rxjs'
  },
  packages: {
    app: {
      format: 'register'
    }
  }
});

System.import('app/main').then(null, console.error.bind(console));
