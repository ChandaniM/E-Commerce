# FE

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

  products =[
    {
      "name": "Multi Grain Combo Cookies",
      "description": "Healthy and delicious multi-grain cookies.",
      "price": 25,
      "image": "/images/brandlogo.png",
      "rating": 4.5,
      "sale": true,
      "grams": [],
      "layout": "portrait",
      "features": {
        "cardWidth": null,
        "button": { "show": false, "text": "" },
        "gramsTags": false,
        "input": { "show": false, "type": "" },
        "titleAlignment": "left",
        "buttonWrapper": "flex-row"
      }
    },
    {
      "name": "Multi Grain Combo Cookies",
      "description": "Healthy and delicious multi-grain cookies.",
      "price": 25,
      "image": "/images/brandlogo.png",
      "rating": 4.5,
      "sale": true,
      "grams": ["250g", "500g"],
      "layout": "landscape",
      "features": {
        "cardWidth": "800px",
        "button": { "show": true, "text": "Add To Cart" },
        "gramsTags": true,
        "input": { "show": true, "type": "number" },
        "titleAlignment": "left",
        "buttonWrapper": "flex-row"
      }
    },
    {
      "name": "Newsletter",
      "description": "Subscribe to Masterkart for future updates.",
      "price": 0,
      "image": "/images/brandlogo.png",
      "rating": 0,
      "sale": false,
      "grams": [],
      "layout": "landscape",
      "features": {
        "cardWidth": null,
        "button": { "show": true, "text": "Subscribe" },
        "gramsTags": false,
        "input": { "show": true, "type": "text" },
        "titleAlignment": "center",
        "buttonWrapper": "flex-column"
      }
    }
  ]
https://icons.getbootstrap.com/?q=cart#styling