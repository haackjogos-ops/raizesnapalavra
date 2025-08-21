import { Button } from "@/components/ui/button";
import { BookOpen, Menu, LogOut, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";

const Header = () => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-2 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
            <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Raízes na Palavra</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/estudos" className="text-muted-foreground hover:text-foreground transition-colors">
                Estudos
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <Shield className="mr-1 h-4 w-4" />
                  Admin
                </Link>
              )}
              <Button variant="ghost" onClick={handleSignOut} className="text-muted-foreground hover:text-foreground">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/estudos" className="text-muted-foreground hover:text-foreground transition-colors">
                Estudos
              </Link>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Recursos
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </a>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <span className="text-sm text-muted-foreground hidden md:block">
              Olá, {user.user_metadata?.display_name || user.email}
            </span>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" className="hidden md:flex">
                  Entrar
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="hero" className="hidden md:flex">
                  Começar
                </Button>
              </Link>
            </>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;