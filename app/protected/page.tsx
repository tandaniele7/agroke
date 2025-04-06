import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplets, CloudRain, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const fieldStats = [
    {
      title: "Campi Attivi",
      value: "12",
      icon: Leaf,
      color: "text-agroke-green bg-agroke-green/10",
    },
    {
      title: "Efficienza Idrica",
      value: "76%",
      icon: Droplets,
      color: "text-agroke-blue bg-agroke-blue/10",
    },
    {
      title: "Condizioni Meteo",
      value: "Ottimali",
      icon: CloudRain,
      color: "text-agroke-blue-light bg-agroke-blue-light/10",
    },
    {
      title: "Allarmi di Rischio",
      value: "3",
      icon: AlertTriangle,
      color: "text-agroke-brown bg-agroke-brown/10",
    },
  ];

  const recentFields = [
    {
      id: 1,
      name: "Campo Nord",
      crop: "Mais",
      health: 85,
      lastUpdated: "2 ore fa",
    },
    {
      id: 2,
      name: "Vigneto Sud",
      crop: "Uva",
      health: 92,
      lastUpdated: "4 ore fa",
    },
    {
      id: 3,
      name: "Frutteto Est",
      crop: "Mele",
      health: 68,
      lastUpdated: "1 giorno fa",
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bentornato, John</h1>
        <p className="text-sm text-muted-foreground">Ultima scansione: Oggi, 08:30</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {fieldStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Attività Recenti nei Campi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFields.map((field) => (
                <div key={field.id} className="field-card">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{field.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {field.lastUpdated}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Coltura: {field.crop}
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Indice di Salute</span>
                      <span className="text-sm font-medium">{field.health}%</span>
                    </div>
                    <Progress value={field.health} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Eventi in Arrivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-agroke-brown" />
                  <p className="font-medium">Allarme Rischio Malattia</p>
                </div>
                <p className="text-sm text-muted-foreground">Il Vigneto Sud potrebbe essere a rischio di oidio.</p>
                <p className="text-xs text-muted-foreground mt-2">Domani</p>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <CloudRain className="h-4 w-4 text-agroke-blue" />
                  <p className="font-medium">Previsione di Forti Piogge</p>
                </div>
                <p className="text-sm text-muted-foreground">Prepara il drenaggio per possibili allagamenti.</p>
                <p className="text-xs text-muted-foreground mt-2">Tra 2 giorni</p>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="h-4 w-4 text-agroke-blue-light" />
                  <p className="font-medium">Programma di Irrigazione</p>
                </div>
                <p className="text-sm text-muted-foreground">Il Frutteto Est necessita di irrigazione.</p>
                <p className="text-xs text-muted-foreground mt-2">Tra 3 giorni</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

