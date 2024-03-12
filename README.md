# Simply To-Do List

This template provides a minimal setup to get started with building a to-do list application using React, TypeScript, and Vite. It includes Hot Module Replacement (HMR) for efficient development and some ESLint rules for code quality.

## Getting Started

To begin using this template, make sure you have Node.js and npm installed. Then, clone this repository and run the following commands:

```bash
npm install
npm run dev
```

This will start the development server and you can view your application in the browser.

## Expanding the Configuration

If you're developing a production application, consider expanding the ESLint configuration:

- Configure the top-level `parserOptions` property in your ESLint configuration file (`eslint.config.js`) like this:

```js
parserOptions: {
  ecmaVersion: 'latest',
  sourceType: 'module',
  project: ['./tsconfig.json', './tsconfig.node.json'],
  tsconfigRootDir: __dirname,
},
```

- Replace `plugin:@typescript-eslint/recommended` with `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`.
- Optionally, you can add `plugin:@typescript-eslint/stylistic-type-checked`.
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list.

## Try It Out

Feel free to try out the to-do list application [here](https://simply-to-do-list-app.web.app/). 

Happy coding! 🚀
