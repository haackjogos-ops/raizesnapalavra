import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <Card className="relative overflow-hidden border-0 bg-gradient-hero shadow-strong">
          <div className="absolute inset-0 bg-primary/10" />
          <div className="relative p-12 md:p-16 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Pronto para começar sua jornada espiritual?
              </h2>
              
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Junte-se a centenas de pessoas que já estão transformando suas vidas através do estudo da Palavra de Deus. 
                Comece hoje mesmo sua caminhada de crescimento e descoberta espiritual.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-medium"
                  >
                    Criar Conta Gratuita
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Link to="/estudos">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
                  >
                    Explorar Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-8 pt-8 text-white/80">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">100% Gratuito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">Sem Compromisso</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">Comece em 2 minutos</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTA;