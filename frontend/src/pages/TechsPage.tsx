import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const techs = [
  {
    name: "Vite",
    description: "Next Generation Frontend Tooling",
    version: "v6.0",
  },
  {
    name: "React",
    description: "A JavaScript library for building user interfaces",
    version: "v19.0",
  },
  {
    name: "TypeScript",
    description: "Strongly typed programming language that builds on JavaScript",
    version: "v5.7",
  },
  {
    name: "TailwindCSS",
    description: "A utility-first CSS framework for rapid UI development",
    version: "v3.4",
  },
  {
    name: "shadcn/ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS",
    version: "Latest",
  },
  {
    name: "Axios",
    description: "Promise based HTTP client for the browser and node.js",
    version: "v1.7",
  },
  {
    name: "React Hook Form",
    description: "Performant, flexible and extensible forms with easy-to-use validation",
    version: "v7.54",
  },
  {
    name: "React Router DOM",
    description: "Declarative routing for React web applications",
    version: "v7.1",
  },
]

export function TechsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Tecnologias</h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl">
          Este projeto foi construído utilizando as melhores ferramentas do ecossistema moderno de
          desenvolvimento web.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {techs.map((tech) => (
          <Card key={tech.name} className="flex flex-col transition-all hover:shadow-md hover:border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{tech.name}</CardTitle>
                <Badge variant="secondary">{tech.version}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription className="text-sm leading-relaxed text-foreground/80">
                {tech.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
