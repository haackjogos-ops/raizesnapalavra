import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface StudyFormProps {
  onStudyCreated?: () => void;
}

const StudyForm = ({ onStudyCreated }: StudyFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDailyStudy, setIsDailyStudy] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    
    // Capture form reference before async operations
    const form = e.currentTarget;
    const formData = new FormData(form);
    const studyData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      bible_reference: formData.get('bible_reference') as string,
      study_date: formData.get('study_date') as string,
      is_daily_study: isDailyStudy,
      created_by: user.id,
    };

    try {
      // Se for estudo do dia, remove o status de outros estudos diários
      if (isDailyStudy) {
        await supabase
          .from('studies')
          .update({ is_daily_study: false })
          .eq('is_daily_study', true);
      }

      const { error } = await supabase
        .from('studies')
        .insert(studyData);

      if (error) throw error;

      toast({
        title: 'Estudo criado com sucesso!',
        description: isDailyStudy ? 'Definido como estudo do dia.' : 'Estudo adicionado à biblioteca.',
      });

      // Reset form
      form.reset();
      setIsDailyStudy(false);
      
      if (onStudyCreated) {
        onStudyCreated();
      }
    } catch (error: any) {
      console.error('Error creating study:', error);
      toast({
        title: 'Erro ao criar estudo',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-medium">
      <CardHeader>
        <CardTitle>Criar Novo Estudo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Estudo</Label>
            <Input
              id="title"
              name="title"
              placeholder="Ex: O Senhor é Meu Pastor - Salmos 23"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bible_reference">Referência Bíblica</Label>
            <Input
              id="bible_reference"
              name="bible_reference"
              placeholder="Ex: Salmos 23:1-6"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="study_date">Data do Estudo</Label>
            <Input
              id="study_date"
              name="study_date"
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo do Estudo</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Escreva o conteúdo completo do estudo bíblico..."
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="daily-study"
              checked={isDailyStudy}
              onCheckedChange={setIsDailyStudy}
            />
            <Label htmlFor="daily-study" className="text-sm font-medium">
              Definir como Estudo do Dia
              <p className="text-xs text-muted-foreground font-normal">
                Este estudo aparecerá em destaque como o estudo principal do dia
              </p>
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Criando estudo...' : 'Criar Estudo'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudyForm;