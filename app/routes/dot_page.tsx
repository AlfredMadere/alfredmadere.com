import type { Route } from "./+types/home_page";
import { Home } from "../home/home";
import DotPatternAnimated from "~/components/ui/dot-pattern-animated";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Alfred Madere" },
    { name: "description", content: "Alfred Madere's personal website" },
  ];
}

export default function HomePage() {
  return <DotPatternAnimated />;
}