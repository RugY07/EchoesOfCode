
import { useEffect, useState, useContext } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

interface HistoryItem {
  id: string;
  diseaseName: string;
  imageUrl: string;
  timestamp: string;
}

const History = () => {
  const { t } = useContext(LanguageContext);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // In a real app, we would fetch from an API
    const savedHistory = localStorage.getItem("diseaseHistory");
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory) as HistoryItem[];
      // Sort by most recent first
      parsedHistory.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setHistoryItems(parsedHistory);
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{t("history")}</h1>
            
            {historyItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-6">{t("no_history")}</p>
                <Button asChild className="btn-gradient">
                  <Link to="/">{t("upload_image")}</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {historyItems.map((item) => (
                  <Card key={item.id} className="card-hover">
                    <CardHeader className="p-0">
                      <div className="h-48 relative overflow-hidden rounded-t-lg">
                        <img 
                          src={item.imageUrl} 
                          alt={item.diseaseName} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{item.diseaseName}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {formatDate(item.timestamp)}
                      </p>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          {t("view_details")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 LeafSense. {t("all_rights_reserved")}</p>
        </div>
      </footer>
    </div>
  );
};

export default History;
