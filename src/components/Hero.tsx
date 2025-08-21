import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Calendar, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-bible-study.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-subtle pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Cresça na
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Palavra de Deus
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Junte-se à nossa comunidade e aprofunde seu conhecimento bíblico com estudos personalizados, 
                acompanhamento de progresso e uma experiência de aprendizado transformadora.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Começar Jornada
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Saber Mais
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Estudos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Membros</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Encontros</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img 
                src={heroImage} 
                alt="Estudo bíblico com livro aberto sobre mesa de madeira" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating cards */}
            <Card className="absolute -top-4 -left-4 p-4 bg-card shadow-medium border-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Estudo Diário</div>
                  <div className="text-xs text-muted-foreground">Salmos 23</div>
                </div>
              </div>
            </Card>

            <Card className="absolute -bottom-4 -right-4 p-4 bg-card shadow-medium border-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-secondary-dark" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Progresso</div>
                  <div className="text-xs text-muted-foreground">85% completo</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;