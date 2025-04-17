"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import { Chart } from 'react-google-charts';
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function PlanningPage() {
  const [activeTab, setActiveTab] = useState("vineyard-piedmont-1");
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts (to handle SSR)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define field data
  const fields = [
    {
      id: "vineyard-piedmont-1",
      name: "Vineyard - Piedmont (Barolo)",
      currentCrop: "Grape (Barolo)",
      area: 12.75,
      health: 85,
      treatments: [
        {
          id: 1,
          name: "Fungicide Treatment",
          start: new Date(2025, 3, 15), // April 15, 2025
          end: new Date(2025, 3, 18),   // April 18, 2025
          category: "Pest Control",
          savingsPercentage: 18,
          yieldIncrease: 22,
          potentialLoss: 3800,
          justification: "Preventive treatment against powdery mildew aligned with growth stage after bud break. Early treatment reduces fungicide usage by 18% compared to reactive treatments."
        },
        {
          id: 2,
          name: "Nutrients Application",
          start: new Date(2025, 3, 25), // April 25, 2025
          end: new Date(2025, 3, 27),   // April 27, 2025
          category: "Fertilization",
          savingsPercentage: 15,
          yieldIncrease: 12,
          potentialLoss: 2400,
          justification: "Strategic nutrient application timed with flowering stage optimizes nutrient uptake efficiency. Properly timed application reduces fertilizer usage by 15%."
        },
        {
          id: 3,
          name: "Controlled Irrigation",
          start: new Date(2025, 4, 10), // May 10, 2025
          end: new Date(2025, 4, 13),   // May 13, 2025
          category: "Water Management",
          savingsPercentage: 25,
          yieldIncrease: 15,
          potentialLoss: 2900,
          justification: "Deficit irrigation strategy during berry growth phase improves grape quality and saves 25% water compared to conventional irrigation."
        }
      ]
    },
    {
      id: "vineyard-piedmont-2",
      name: "Vineyard - Piedmont (Nebbiolo)",
      currentCrop: "Grape (Nebbiolo)",
      area: 8.32,
      health: 75,
      treatments: [
        {
          id: 1,
          name: "Emergency Irrigation",
          start: new Date(2025, 3, 12), // April 12, 2025
          end: new Date(2025, 3, 14),   // April 14, 2025
          category: "Water Management",
          savingsPercentage: 0,
          yieldIncrease: 30,
          potentialLoss: 5200,
          justification: "Urgent intervention required due to critical water levels detected. Will prevent estimated 30% crop loss (€5,200 value) though no direct resource savings."
        },
        {
          id: 2,
          name: "Fungicide Application",
          start: new Date(2025, 3, 20), // April 20, 2025
          end: new Date(2025, 3, 22),   // April 22, 2025
          category: "Pest Control",
          savingsPercentage: 12,
          yieldIncrease: 18,
          potentialLoss: 3100,
          justification: "Preventive application against downy mildew based on weather forecast and vineyard microclimate analysis. Early treatment reduces application frequency by 12%."
        },
        {
          id: 3,
          name: "Balanced Fertilization",
          start: new Date(2025, 4, 5),  // May 5, 2025
          end: new Date(2025, 4, 8),    // May 8, 2025
          category: "Fertilization",
          savingsPercentage: 20,
          yieldIncrease: 15,
          potentialLoss: 2600,
          justification: "Precision fertilization based on soil analysis and vine growth stage. Targeted approach reduces fertilizer use by 20% while improving grape quality."
        }
      ]
    },
    {
      id: "apple-orchard",
      name: "Apple Orchard - Piedmont",
      currentCrop: "Apple",
      area: 15.45,
      health: 60,
      treatments: [
        {
          id: 1,
          name: "Apple Scab Treatment",
          start: new Date(2025, 3, 11), // April 11, 2025
          end: new Date(2025, 3, 13),   // April 13, 2025
          category: "Pest Control",
          savingsPercentage: 0,
          yieldIncrease: 40,
          potentialLoss: 7500,
          justification: "Urgent treatment required to address high disease risk. While no resource savings, preventing apple scab infection preserves an estimated €7,500 in potential yield."
        },
        {
          id: 2,
          name: "Urgent Irrigation",
          start: new Date(2025, 3, 15), // April 15, 2025
          end: new Date(2025, 3, 18),   // April 18, 2025
          category: "Water Management",
          savingsPercentage: 0,
          yieldIncrease: 25,
          potentialLoss: 4800,
          justification: "Critical water supplementation needed due to prolonged dry conditions. Prevents estimated 25% yield loss despite requiring additional water resources."
        },
        {
          id: 3,
          name: "Comprehensive Fertilization",
          start: new Date(2025, 4, 1),  // May 1, 2025
          end: new Date(2025, 4, 5),    // May 5, 2025
          category: "Fertilization",
          savingsPercentage: 10,
          yieldIncrease: 20,
          potentialLoss: 3800,
          justification: "Soil analysis shows severe nutrient deficiencies. Precision application timed with fruit development reduces fertilizer needs by 10% compared to standard practice."
        },
        {
          id: 4,
          name: "Pest Control Program",
          start: new Date(2025, 4, 10), // May 10, 2025
          end: new Date(2025, 4, 15),   // May 15, 2025
          category: "Pest Control",
          savingsPercentage: 15,
          yieldIncrease: 30,
          potentialLoss: 5500,
          justification: "Integrated pest management approach targeting codling moth during egg-laying period. Reduces pesticide use by 15% compared to calendar-based spraying."
        }
      ]
    }
  ];

  // Function to prepare Gantt chart data
interface Treatment {
    id: number;
    name: string;
    start: Date;
    end: Date;
    category: string;
    savingsPercentage: number;
    yieldIncrease: number;
    potentialLoss: number;
    justification: string;
}

interface Field {
    id: string;
    name: string;
    currentCrop: string;
    area: number;
    health: number;
    treatments: Treatment[];
}

interface GanttChartRow {
    type: string;
    label: string;
}

const prepareGanttData = (fieldId: string): (string | Date | number | null)[][] => {
    const field: Field | undefined = fields.find(f => f.id === fieldId);
    if (!field) return [
        [
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Resource' },
            { type: 'date', label: 'Start Date' },
            { type: 'date', label: 'End Date' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
        ],
        ['No Data', 'No Data', 'category', new Date(), new Date(), 0, 0, null],
    ];

    const chartData: (string | Date | number | null)[][] = [
        [
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Resource' },
            { type: 'date', label: 'Start Date' },
            { type: 'date', label: 'End Date' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
        ],
    ];

    field.treatments.forEach((treatment: Treatment) => {
        chartData.push([
            treatment.id.toString(),
            treatment.name,
            treatment.category,
            treatment.start,
            treatment.end,
            null,
            100,
            null,
        ]);
    });

    return chartData;
};

  // Calculate total savings and benefits
  const calculateSummary = (fieldId: string) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return { totalSavings: 0, totalYieldIncrease: 0, totalPotentialLoss: 0 };

    const totalSavings = field.treatments.reduce((acc, treatment) => acc + treatment.savingsPercentage, 0) / field.treatments.length;
    const totalYieldIncrease = field.treatments.reduce((acc, treatment) => acc + treatment.yieldIncrease, 0) / field.treatments.length;
    const totalPotentialLoss = field.treatments.reduce((acc, treatment) => acc + treatment.potentialLoss, 0);

    return { totalSavings, totalYieldIncrease, totalPotentialLoss };
  };

  // Get the active field
  const activeField = fields.find(field => field.id === activeTab);
  const summary = calculateSummary(activeTab);

  // Get category color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Water Management": return "bg-blue-100 text-blue-800";
      case "Fertilization": return "bg-green-100 text-green-800";
      case "Pest Control": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-agroke-black-dark">Field Treatment Planning</h1>
        <p className="text-sm text-muted-foreground">Last Update: April 10, 2025</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-agroke-black-dark">Treatment Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3">
              {fields.map(field => (
                <TabsTrigger key={field.id} value={field.id} className="text-sm">
                  {field.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {fields.map(field => (
              <TabsContent key={field.id} value={field.id} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Field Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Crop</p>
                          <p className="font-medium">{field.currentCrop}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Area</p>
                          <p className="font-medium">{field.area} hectares</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Health Index</p>
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ 
                                backgroundColor: field.health > 80 ? "#22c55e" : field.health > 60 ? "#eab308" : "#ef4444" 
                              }}
                            />
                            <p className="font-medium">{field.health}%</p>
                          </div>
                        </div>
                        <div className="pt-2">
                          <Link 
                            href={`/protected/fields/${field.id}`}
                            className={buttonVariants({ variant: "outline" })}
                          >
                            View Field Details
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Treatment Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Resource Savings</p>
                          <p className="font-medium text-green-600">Average {summary.totalSavings.toFixed(1)}% reduction</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Yield Enhancement</p>
                          <p className="font-medium text-blue-600">Average {summary.totalYieldIncrease.toFixed(1)}% increase</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Potential Loss Prevention</p>
                          <p className="font-medium text-red-600">€{summary.totalPotentialLoss.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Number of Treatments</p>
                          <p className="font-medium">{field.treatments.length} scheduled</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Treatment Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Array.from(new Set(field.treatments.map(t => t.category))).map(category => (
                          <div key={category} className="flex items-center justify-between py-1">
                            <Badge className={getCategoryColor(category)}>
                              {category}
                            </Badge>
                            <span className="text-sm">
                              {field.treatments.filter(t => t.category === category).length} treatments
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-2 border-t">
                        <p className="text-sm text-muted-foreground mb-1">Next Treatment</p>
                        {field.treatments
                          .filter(t => t.start >= new Date())
                          .sort((a, b) => a.start.getTime() - b.start.getTime())[0] ? (
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 mr-1 text-agroke-green" />
                              <span>
                                {field.treatments
                                  .filter(t => t.start >= new Date())
                                  .sort((a, b) => a.start.getTime() - b.start.getTime())[0].name} - {field.treatments
                                  .filter(t => t.start >= new Date())
                                  .sort((a, b) => a.start.getTime() - b.start.getTime())[0].start.toLocaleDateString()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm">No upcoming treatments</span>
                          )
                        }
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Treatment Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isClient && (
                      <div className="h-80 w-full">
                        <Chart
                          chartType="Gantt"
                          width="100%"
                          height="100%"
                          data={prepareGanttData(field.id)}
                          options={{
                            gantt: {
                              trackHeight: 30,
                              barHeight: 20,
                              labelStyle: {
                                fontName: 'system-ui',
                                fontSize: 14,
                              },
                              palette: [
                                {
                                  "color": "#4285F4", // Water Management
                                  "dark": "#3367D6",
                                  "light": "#C6DAFC"
                                },
                                {
                                  "color": "#34A853", // Fertilization
                                  "dark": "#0F9D58",
                                  "light": "#B7E1CD"
                                },
                                {
                                  "color": "#FBBC05", // Pest Control
                                  "dark": "#F09300",
                                  "light": "#FCE8B2"
                                }
                              ]
                            },
                          }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Treatment Details & Justification</h3>
                  {field.treatments.map(treatment => (
                    <Card key={treatment.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center mb-1">
                              <Badge className={getCategoryColor(treatment.category)}>
                                {treatment.category}
                              </Badge>
                              <span className="ml-2 text-sm text-muted-foreground">
                                {treatment.start.toLocaleDateString()} - {treatment.end.toLocaleDateString()}
                              </span>
                            </div>
                            <h4 className="font-medium text-lg">{treatment.name}</h4>
                            <p className="mt-1 text-sm text-agroke-black-dark">
                              {treatment.justification}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex flex-col gap-2">
                              {treatment.savingsPercentage > 0 && (
                                <span className="text-sm font-medium text-green-600">
                                  {treatment.savingsPercentage}% resource savings
                                </span>
                              )}
                              <span className="text-sm font-medium text-blue-600">
                                {treatment.yieldIncrease}% yield increase
                              </span>
                              <span className="text-sm font-medium text-red-600">
                                €{treatment.potentialLoss.toLocaleString()} potential loss prevention
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}