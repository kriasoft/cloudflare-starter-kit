# Web Application

Web application package powered by [Vite](https://vitejs.dev/),
[React](https://reactjs.org/), [React Router](https://reactrouter.com/),
[Recoil](https://recoiljs.org/), and [Material UI](https://mui.com/core/).

### How to Access the Logged-In User?

```tsx
import { useCurrentUser } from "../state/firebase.js";

function Example(): JSX.Element {
  const me = useCurrentUser();
  return <Box>Hello, {me?.name}!</Box>;
}
```

### How to Sign In / Sign Out?

```tsx
import { useAuth } from "../state/firebase.js";

function Example(): JSX.Element {
  const auth = useAuth();
  return (
    <Box>
      <Button onClick={auth.signIn}>Sign In</Button>
      <Button onClick={auth.signOut}>Sign Out</Button>
    </Box>
  );
}
```
