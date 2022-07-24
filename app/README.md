# Web Application

Web application package powered by [Vite](https://vitejs.dev/),
[React](https://reactjs.org/), [React Router](https://reactrouter.com/),
[Recoil](https://recoiljs.org/), and [Material UI](https://mui.com/core/).

### How to Access the Logged-In User?

```ts
import { useCurrentUser } from "../state/user";

function Example(): JSX.Element {
  const me = useCurrentUser();
  return <p>Hello, {me?.name}!</p>;
}
```
