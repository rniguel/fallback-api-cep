import { Link } from "react-router-dom"
import { LayoutDashboard, Laptop } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-primary text-primary-foreground p-1 rounded">CEP</span>
          <span>Fallback</span>
        </div>
        <div className="flex gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
          >
            <LayoutDashboard className="h-4 w-4" />
            Formulário
          </Link>
          <Link
            to="/techs"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
          >
            <Laptop className="h-4 w-4" />
            Tecnologias
          </Link>
        </div>
      </div>
    </nav>
  )
}
