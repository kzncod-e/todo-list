import { Redirect } from "expo-router";

export default function Index() {
  // route groups (like (tabs)) are filesystem-only; navigate to the public path '/todo'
  return <Redirect href="/todo" />;
}
