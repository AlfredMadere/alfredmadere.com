import { Github, Linkedin, Twitter } from "lucide-react";
import { DotPattern } from "../components/ui/dot-pattern";
import { DarkModeToggle } from "../components/dark-mode-toggle";

export function Home() {
  return (
    <main className="h-screen  relative">
      <DotPattern />
      <div className="w-full flex justify-between p-8">
        <div>
          Me
        </div>
        <div className="flex gap-4 text-gray-700 dark:text-gray-600 ">
          <a className="hover:text-gray-300" href="https://www.linkedin.com/in/alfred-madere/" target="_blank"><Linkedin /></a>
          <a className="hover:text-gray-300" href="https://github.com/AlfredMadere" target="_blank"><Github /></a>
          <a className="hover:text-gray-300" href="https://www.twitter.com/alfredmadere" target="_blank"><Twitter /></a>
          <DarkModeToggle />
        </div>
      </div>
      <div className="flex items-center flex-col  p-15">
        
      <div className="max-w-[700px]">
      <h1 className="text-4xl font-light mb-8">
        Alfred Madere
      </h1>
      <div className="text-gray-700 dark:text-gray-300">

      <p className=" mb-4">I'm an engineer and an entrepreneur at heart. My focus is on tackling the engineering challenges of AI and scalable, data-intensive applications.</p>
        <p >Working at <a className="underline" href="https://www.cascading.ai/">Casca</a></p>
        <p className=" mb-5">Creator of <a className="underline" href="https://www.paperwatch.io/">Paperwatch</a> <a className="underline" href="https://www.choretracker.app/">Choretracker</a></p>
      </div>
      </div>
      </div>
    </main>
  );
}

const projects = [
  {
    name: "",
    description: "",
    image: "",
    link: "",
    dateRange: "",
  }
]

