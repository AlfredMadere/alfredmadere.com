import { DotPattern } from "../components/ui/dot-pattern";

export function Home() {
  return (
    <main className="h-screen flex items-center justify-center pt-16 pb-4 px-4 relative">
      <DotPattern />
      <div className="flex justify-between gap-2 items-center w-full">
        <div className="text-3xl font-light">
          Alfred Madere
        </div>
        <div className="max-w-[500px]">
          <p>Engineer based in San Francisco. Entrepreneur at heart. Focused on tackling the engineering challenges of AI and scalable, data-intensive applications.</p>
        </div>
      </div>
      <div>
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

