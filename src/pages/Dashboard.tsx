import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, TrendingUp, Award, Clock, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Olá, João! 👋</h1>
            <p className="text-muted-foreground mt-2">Continue sua jornada de crescimento espiritual</p>
          </div>
          <Button variant="hero" className="mt-4 md:mt-0">
            <BookOpen className="mr-2 h-4 w-4" />
            Novo Estudo
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estudos Concluídos</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">47</div>
              <p className="text-xs text-muted-foreground">+12% este mês</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sequência Atual</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">23 dias</div>
              <p className="text-xs text-muted-foreground">Continue assim!</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Investido</CardTitle>
              <Clock className="h-4 w-4 text-secondary-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">84h</div>
              <p className="text-xs text-muted-foreground">Média 2h/semana</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximo Encontro</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2 dias</div>
              <p className="text-xs text-muted-foreground">Quarta, 19h</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Estudo do Dia */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    Estudo do Dia
                  </CardTitle>
                  <Button variant="outline" size="sm">Concluir</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  O Senhor é Meu Pastor - Salmos 23
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  "O SENHOR é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, 
                  guia-me mansamente a águas tranquilas. Refrigera a minha alma; guia-me pelas 
                  veredas da justiça, por amor do seu nome..."
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <Button variant="hero">Começar Estudo</Button>
                  <span className="text-sm text-muted-foreground">⏱️ 15-20 min</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progresso Atual */}
          <div className="space-y-6">
            <Card className="border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg">Progresso Atual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Série: Salmos</span>
                    <span className="text-muted-foreground">23/30</span>
                  </div>
                  <Progress value={77} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Série: Provérbios</span>
                    <span className="text-muted-foreground">8/20</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>

                <Button className="w-full mt-4" variant="outline">
                  Ver Todos os Estudos
                </Button>
              </CardContent>
            </Card>

            {/* Próximos Eventos */}
            <Card className="border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-accent" />
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-8 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Estudo em Grupo</p>
                    <p className="text-xs text-muted-foreground">Quarta, 19:00</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-8 bg-secondary-dark rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Culto de Oração</p>
                    <p className="text-xs text-muted-foreground">Sexta, 20:00</p>
                  </div>
                </div>

                <Button className="w-full mt-4" variant="outline" size="sm">
                  Ver Calendário Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;