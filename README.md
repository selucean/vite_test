
#### Usage:

```sh
bun install
bun run dev
```
#### Libraries used:
- Redux
- Redux-Saga (+typed-redux-saga)
- Redux-Tookit
- Tailwindcss (+tailwind-merge)
- React-Router
- React-Hook-Form (+zod)

#### Possible improvements:

- Type naming could be improved to be more readable + function decorators / descriptive comments
- Proper error boundary with a protected route provider would be an improvement over current status check + redirects
- Would like to update the getUser functionality, currently using cached flat-structure request data. Making a request for single user would be the preferred option if available.
- Implement eslint configuration and add pre-commit checks with husky
