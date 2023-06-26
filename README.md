# cripto-back
This application uses TypeScript, Node, Express and Jest.

## About

This is a web browser application to keep track of criptocurrency.

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Make sure your mongoDB is connected
4. Configure the `.env.development` file using the `.env.example` file
5. Run the back-end in a development environment:

```bash
npm run dev
```

## How to run tests

1. Follow the steps in the last section
2. Configure the `.env.test` file using the `.env.example` file

3. Run test:
   (locally)

```bash
npm run test
```

## Building and starting for production

```bash
npm run build
npm start
```

## What to do when add new ENV VARIABLES

There are several things you need to do when you add new ENV VARIABLES:
- Add them to `.env.example` file
- Add them to your local `.env.development` and `.env.test` files
- Add them (prod version) to your github repo secrets. They will be used to generate the `.env` file on deploy.
