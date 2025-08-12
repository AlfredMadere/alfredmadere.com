import { Github, Linkedin, Twitter } from "lucide-react";
import { DotPattern } from "../components/ui/dot-pattern";
import { DarkModeToggle } from "../components/dark-mode-toggle";

export function Home() {
  return (
    <main className="h-screen  relative">
      <DotPattern />
      <div className="w-full flex justify-between p-8">
        <div className="text-2xl font-bold text-black dark:text-white">
          AM
        </div>
        <div className="flex gap-4 text-gray-700 dark:text-gray-600 ">
          <a className="hover:text-gray-300 cursor-pointer  flex place-items-center" href="https://www.linkedin.com/in/alfred-madere/" target="_blank"><Linkedin /></a>
          <a className="hover:text-gray-300 cursor-pointer  flex place-items-center" href="https://github.com/AlfredMadere" target="_blank"><Github /></a>
          <a className="hover:text-gray-300 cursor-pointer  flex place-items-center" href="https://www.twitter.com/alfredmadere" target="_blank"><Twitter /></a>
          <DarkModeToggle />
        </div>
      </div>
      <article className=" flex items-center flex-col  p-15">

        <div className="max-w-[700px] prose dark:prose-invert m-auto">
          <h1 className="mb-8 text-black dark:text-white">
            Alfred Madere
          </h1>
          <div className="text-gray-700 dark:text-gray-300">

            <p>I'm an engineer and an entrepreneur at heart. My focus is on tackling the engineering challenges of AI and scalable, data-intensive applications.</p>
            <p>
              {"Working at "}
              <a className="underline" href="https://www.cascading.ai/">Casca</a>
              <br />
              {"Creator of "}
              <a className="underline" href="https://www.paperwatch.io/">Paperwatch</a>
              {" "} 
              <a className="underline" href="https://www.choretracker.app/">Choretracker</a>

            </p>
            <p >
              Outside of software engineering, I enjoy being outside and improving at my various
              <i> transportation sport </i> hobbies like
              <a className="underline" href="https://en.wikipedia.org/wiki/Windsurfing"> windsurfing</a>,
              <a className="underline" href="https://en.wikipedia.org/wiki/Rock_climbing"> climbing</a> and
              <a className="underline" href="https://en.wikipedia.org/wiki/Wing_foiling"> wingfoiling</a>.
            </p>
          </div>
        </div>
      </article>
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

