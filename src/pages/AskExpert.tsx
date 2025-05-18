
import { useState, useContext } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LanguageContext } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

const AskExpert = () => {
  const { t } = useContext(LanguageContext);
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter your question",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Create a template for the email
    const templateParams = {
      message: question,
      from_name: "LeafSense User Question",
      to_name: "Expert",
    };
    
    try {
      // Send email via EmailJS
      // Note: You'll need to set up a free EmailJS account and 
      // create a template for this to work
      await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        templateParams,
        "YOUR_USER_ID" // Replace with your EmailJS user ID
      );
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Success",
        description: "Your question has been submitted!",
      });
      
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Email failed to send:", error);
      setIsSubmitting(false);
      
      toast({
        title: "Error",
        description: "Failed to submit your question. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{t("ask_expert")}</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("ask_question")}</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8 animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">
                      {t("question_received")}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {t("expert_response_time")}
                    </p>
                    <Button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setQuestion("");
                      }}
                    >
                      {t("ask_another_question")}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="question" className="text-sm font-medium block mb-1">
                        {t("your_question")}
                      </label>
                      <Textarea
                        id="question"
                        rows={6}
                        placeholder={t("enter_question_placeholder")}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="resize-none"
                      />
                    </div>
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full btn-gradient" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {t("submitting")}
                          </>
                        ) : (
                          t("submit")
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
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

export default AskExpert;
