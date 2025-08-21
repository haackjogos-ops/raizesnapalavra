import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Calendar, BarChart3, Shield, Smartphone } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Estudos Personalizados",
      description: "Acompanhe seu progresso em estudos bíblicos criados especialmente para seu crescimento espiritual."
    },
    {
      icon: Calendar,
      title: "Estudo do Dia",
      description: "Receba diariamente um novo estudo bíblico preparado com carinho pela liderança da comunidade."
    },
    {
      icon: Users,
      title: "Encontros & Eventos",
      description: "Fique por dentro de todos os encontros, estudos em grupo e eventos da sua comunidade."
    },
    {
      icon: BarChart3,
      title: "Acompanhe seu Progresso",
      description: "Visualize seu crescimento com estatísticas detalhadas dos seus estudos concluídos."
    },
    {
      icon: Shield,
      title: "API Bíblica Integrada",
      description: "Acesso direto às Escrituras em português com busca avançada por versículos e capítulos."
    },
    {
      icon: Smartphone,
      title: "Experiência Mobile",
      description: "Interface responsiva que funciona perfeitamente em todos os dispositivos, como um app nativo."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tudo que você precisa para
            <span className="block text-primary">crescer na fé</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa que une tradição e tecnologia para transformar sua jornada de estudos bíblicos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-medium transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:bg-card"
              >
                <CardHeader className="pb-4">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;