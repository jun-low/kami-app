# KamiFrontendApp

This project is a Dashboard app for viewing Posts, Users, Albums, and Photos, built with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

The Dashboard app provides the following features:

- Posts: View a list of posts, including the post title, body, and the user who created the post.
- Albums: View a list of albums, including the album title and the user who created the album.
- Photos: View a list of photos, including the photo title, URL, and the album the photo belongs to.
- Users: View the user profile including name, username, email, and website.

You can navigate between these sections except users using the menu on the left side of the dashboard.

## Getting Started
Firstly, clone this repository.

```
git clone git@github.com:jun-low/kami-frontend-app.git
```

Navigate to the directory and install the dependencies.
```
cd KamiFrontendApp
npm install
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
