import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import StudyForm from '@/components/admin/StudyForm';
import EventForm from '@/components/admin/EventForm';
import UserManagement from '@/components/admin/UserManagement';
import { supabase } from '@/integrations/supabase/client';
import { 
  Settings, 
  BookOpen, 
  CalendarDays, 
  Users, 
  TrendingUp,
  ArrowLeft,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from "@/components/Header";

const Admin = () => {
  const { user } = useAuth();
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudies: 0,
    totalEvents: 0,
    totalUsers: 0,
    completedStudies: 0,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth');
        return;
      }
      if (!isAdmin) {
        navigate('/dashboard');
        return;
      }
      fetchStats();
    }
  }, [user, isAdmin, loading, navigate, refreshKey]);

  const fetchStats = async () => {
    try {
      // Fetch studies count
      const { count: studiesCount } = await supabase
        .from('studies')
        .select('*', { count: 'exact' });

      // Fetch events count
      const { count: eventsCount } = await supabase
        .from('events')
        .select('*', { count: 'exact' });

      // Fetch users count
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      // Fetch completed studies count
      const { count: completedCount } = await supabase
        .from('user_study_progress')
        .select('*', { count: 'exact' })
        .eq('completed', true);

      setStats({
        totalStudies: studiesCount || 0,
        totalEvents: eventsCount || 0,
        totalUsers: usersCount || 0,
        completedStudies: completedCount || 0,
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // useEffect will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-subtle pt-20">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Dashboard
          </Link>
          
          <Badge variant="default" className="bg-primary">
            <Shield className="mr-1 h-3 w-3" />
            Administrador
          </Badge>
        </div>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-primary rounded-full">
            <Settings className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Painel Administrativo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gerencie estudos, eventos e usuários da plataforma Raízes na Palavra
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Estudos</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalStudies}</div>
              <p className="text-xs text-muted-foreground">Estudos publicados</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos Criados</CardTitle>
              <CalendarDays className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">No calendário</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
              <Users className="h-4 w-4 text-secondary-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Cadastrados</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estudos Concluídos</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.completedStudies}</div>
              <p className="text-xs text-muted-foreground">Por todos os usuários</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="studies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="studies">Gerenciar Estudos</TabsTrigger>
            <TabsTrigger value="events">Criar Eventos</TabsTrigger>
            <TabsTrigger value="users">Gerenciar Usuários</TabsTrigger>
          </TabsList>
          
          <TabsContent value="studies" className="space-y-6">
            <StudyForm onStudyCreated={handleRefresh} />
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            <EventForm onEventCreated={handleRefresh} />
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;