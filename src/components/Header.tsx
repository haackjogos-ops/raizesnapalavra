import { Button } from "@/components/ui/button";
import { BookOpen, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-2 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
            <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Raízes na Palavra</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/estudos" className="text-muted-foreground hover:text-foreground transition-colors">
            Estudos
          </Link>
          <Link to="/encontros" className="text-muted-foreground hover:text-foreground transition-colors">
            Encontros
          </Link>
          <Link to="/sobre" className="text-muted-foreground hover:text-foreground transition-colors">
            Sobre
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:flex">
            Entrar
          </Button>
          <Button variant="hero" className="hidden md:flex">
            Começar
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;