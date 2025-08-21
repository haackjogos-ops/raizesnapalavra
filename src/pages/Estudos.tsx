import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Search, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from "@/components/Header";

interface Study {
  id: string;
  title: string;
  content: string;
  bible_reference: string;
  study_date: string;
  is_daily_study: boolean;
  completed?: boolean;
}

const Estudos = () => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchStudies();
  }, [user]);

  const fetchStudies = async () => {
    try {
      const { data: studiesData, error: studiesError } = await supabase
        .from('studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (studiesError) throw studiesError;

      // If user is logged in, fetch their progress
      if (user) {
        const { data: progressData, error: progressError } = await supabase
          .from('user_study_progress')
          .select('study_id, completed')
          .eq('user_id', user.id);

        if (progressError) throw progressError;

        const progressMap = new Map(
          progressData?.map(p => [p.study_id, p.completed]) || []
        );

        const studiesWithProgress = studiesData?.map(study => ({
          ...study,
          completed: progressMap.get(study.id) || false,
        })) || [];

        setStudies(studiesWithProgress);
      } else {
        setStudies(studiesData || []);
      }
    } catch (error) {
      console.error('Error fetching studies:', error);
      toast({
        title: 'Erro ao carregar estudos',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (studyId: string) => {
    if (!user) {
      toast({
        title: 'Faça login',
        description: 'Você precisa estar logado para marcar estudos como concluídos.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_study_progress')
        .upsert({
          user_id: user.id,
          study_id: studyId,
          completed: true,
          completed_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Update local state
      setStudies(prev =>
        prev.map(study =>
          study.id === studyId ? { ...study, completed: true } : study
        )
      );

      toast({
        title: 'Estudo concluído!',
        description: 'Parabéns por mais um estudo completo.',
      });
    } catch (error) {
      console.error('Error marking study as completed:', error);
      toast({
        title: 'Erro ao marcar estudo',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    }
  };

  const filteredStudies = studies.filter(study =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.bible_reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dailyStudy = studies.find(study => study.is_daily_study);
  const regularStudies = filteredStudies.filter(study => !study.is_daily_study);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Carregando estudos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle pt-20">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-primary rounded-full">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Estudos Bíblicos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore nossa biblioteca de estudos e fortaleça sua caminhada espiritual
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título ou referência bíblica..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Daily Study */}
        {dailyStudy && (
          <Card className="border-0 shadow-strong bg-gradient-hero">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-primary-foreground">
                  <Calendar className="mr-2 h-5 w-5" />
                  Estudo do Dia
                </CardTitle>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Especial
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-white">
              <h3 className="text-xl font-semibold">{dailyStudy.title}</h3>
              <p className="text-white/90">{dailyStudy.bible_reference}</p>
              <p className="text-white/80 line-clamp-3">{dailyStudy.content}</p>
              <div className="flex items-center space-x-4 pt-2">
                {user && !dailyStudy.completed ? (
                  <Button
                    onClick={() => markAsCompleted(dailyStudy.id)}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Marcar como Concluído
                  </Button>
                ) : user && dailyStudy.completed ? (
                  <Badge className="bg-green-500">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Concluído
                  </Badge>
                ) : (
                  <Link to="/auth">
                    <Button className="bg-white text-primary hover:bg-white/90">
                      Fazer Login para Acompanhar
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Regular Studies */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Todos os Estudos</h2>
          
          {regularStudies.length === 0 ? (
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Nenhum estudo encontrado
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? 'Tente ajustar sua busca para encontrar estudos.' 
                    : 'Os estudos aparecerão aqui quando forem adicionados.'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularStudies.map((study) => (
                <Card
                  key={study.id}
                  className="group hover:shadow-medium transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:bg-card"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {study.title}
                      </CardTitle>
                      {user && study.completed && (
                        <Badge className="bg-green-500 shrink-0">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Concluído
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-primary font-medium">
                      {study.bible_reference}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {study.content}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {new Date(study.study_date).toLocaleDateString('pt-BR')}
                      </div>
                      {user && !study.completed && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsCompleted(study.id)}
                        >
                          Concluir
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Estudos;