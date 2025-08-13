import { Github, Linkedin, Twitter } from "lucide-react";
import { DotPattern } from "../components/ui/dot-pattern";
import { DarkModeToggle } from "../components/dark-mode-toggle";
import DotPatternAnimated from "~/components/ui/dot-pattern-animated";

export function Home() {
  return (
    <main className="h-screen  relative">
      <DotPatternAnimated />
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
              <a className="underline" href="https://cascading.ai/">Casca</a>
              <br />
              {"Creator of "}
              <a className="underline" href="https://paperwatch.io/">Paperwatch</a>
              {/* {" "}
              <a className="underline" href="https://choretracker.app/">Choretracker</a> */}
              <br />
              Read my <a href="/resume.pdf" target="_blank">Resume</a>


            </p>
            <p >
              Outside of software engineering, I enjoy being outside and improving at my various
              <i> transportation sport </i> hobbies like
              <a className="underline" href="https://en.wikipedia.org/wiki/Windsurfing"> windsurfing</a>,
              <a className="underline" href="https://en.wikipedia.org/wiki/Rock_climbing"> climbing</a> and
              <a className="underline" href="https://en.wikipedia.org/wiki/Mountain_biking"> mountain biking</a>.
              I also love music, and taught jazz saxophone lessons for 5 years. I'm fascinated by the mechanisms of 
              human learning, and find teaching to be extremely rewarding.
            </p>
            <p>I recently made the move to San Francisco, if you're in the area, let's get a coffee together.</p>
            <p>Find me on <a href="https://www.linkedin.com/in/alfred-madere/">LinkedIn</a>, <a href="https://github.com/AlfredMadere">GitHub</a>, <a href="https://twitter.com/alfredmadere">X,</a> <a href="https://www.instagram.com/alfred_madere/">Instagram</a></p>
            <p>Or mail me at <span className="font-mono text-gray-400 dark:text-gray-400">hi@alfredmadere.com</span></p>
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

