import { Redirect, type Href } from "expo-router";

export default function HomeScreen() {
  return <Redirect href={"/feeds" as Href} />;
}
