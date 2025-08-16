import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/ui/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useFxRates } from "@/hooks/useFxRates";
import { MOCK_TRANSACTIONS, Transaction } from "@/types/transaction";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { 
  Send, 
  RefreshCw, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ADS_DATA = [
  {
    id: 1,
    title: "University Scholarships Available",
    description: "Apply now for 2024 scholarships for Zimbabwean students",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
    cta: "Learn More"
  },
  {
    id: 2,
    title: "Student Banking Made Easy",
    description: "Open a UK student bank account in minutes",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    cta: "Get Started"
  },
  {
    id: 3,
    title: "Study Abroad Insurance",
    description: "Comprehensive health insurance for international students",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
    cta: "Compare Plans"
  }
];

export default function Dashboard() {
  const { user } = useAuth();
  const { rates, isLoading: ratesLoading, error: ratesError, refetch } = useFxRates();
  const navigate = useNavigate();
  
  // Send Money Form State
  const [amount, setAmount] = useState("");
  const [corridor, setCorridor] = useState<"GBP" | "ZAR" | "">("");
  const [recipient, setRecipient] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Ads State
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Calculate transfer details
  const transferCalculation = useMemo(() => {
    if (!amount || !corridor || !rates) return null;
    
    const usdAmount = parseFloat(amount);
    if (isNaN(usdAmount) || usdAmount < 5 || usdAmount > 2000) return null;
    
    const feePercentage = corridor === "GBP" ? 10 : 20;
    const fee = (usdAmount * feePercentage) / 100;
    const amountAfterFee = usdAmount - fee;
    const exchangeRate = rates[corridor];
    const targetAmount = Math.ceil(amountAfterFee * exchangeRate);
    
    return {
      usdAmount,
      fee,
      feePercentage,
      amountAfterFee,
      exchangeRate,
      targetAmount,
      targetCurrency: corridor
    };
  }, [amount, corridor, rates]);

  // Pagination calculations
  const totalPages = Math.ceil(MOCK_TRANSACTIONS.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = MOCK_TRANSACTIONS.slice(startIndex, startIndex + itemsPerPage);

  const handleSendMoney = () => {
    if (!transferCalculation || !recipient.trim()) {
      toast.error("Please fill in all fields correctly");
      return;
    }
    
    if (transferCalculation.usdAmount < 5 || transferCalculation.usdAmount > 2000) {
      toast.error("Amount must be between $5 and $2,000");
      return;
    }
    
    // Simulate transaction
    toast.success(`Transfer of $${transferCalculation.usdAmount} initiated successfully!`);
    
    // Reset form
    setAmount("");
    setCorridor("");
    setRecipient("");
  };

  const nextAd = () => {
    setCurrentAdIndex((prev) => (prev + 1) % ADS_DATA.length);
  };

  const prevAd = () => {
    setCurrentAdIndex((prev) => (prev - 1 + ADS_DATA.length) % ADS_DATA.length);
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusBadgeVariant = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navigation isLoggedIn={true} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground">
              Send money to your student quickly and securely
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Send Money Section */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="gradient-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <Send className="w-5 h-5 mr-2" />
                    Send Money
                  </CardTitle>
                  <CardDescription>
                    Transfer funds to your student in the UK or South Africa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (USD)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="100"
                        min="5"
                        max="2000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Min: $5, Max: $2,000
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="corridor">Destination</Label>
                      <Select value={corridor} onValueChange={(value: "GBP" | "ZAR") => setCorridor(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GBP">United Kingdom (GBP) - 10% fee</SelectItem>
                          <SelectItem value="ZAR">South Africa (ZAR) - 20% fee</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient Details</Label>
                    <Input
                      id="recipient"
                      placeholder="e.g., Jerald Whande - University of Oxford"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>

                  {/* Exchange Rate Display */}
                  {rates && (
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Current Exchange Rates</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={refetch}
                          disabled={ratesLoading}
                        >
                          <RefreshCw className={`w-4 h-4 ${ratesLoading ? 'animate-spin' : ''}`} />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 text-primary mr-2" />
                          1 USD = {rates.GBP.toFixed(4)} GBP
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 text-primary mr-2" />
                          1 USD = {rates.ZAR.toFixed(2)} ZAR
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Transfer Summary */}
                  {transferCalculation && (
                    <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                      <h4 className="font-medium text-primary mb-3">Transfer Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span>${transferCalculation.usdAmount.toFixed(2)} USD</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fee ({transferCalculation.feePercentage}%):</span>
                          <span>-${transferCalculation.fee.toFixed(2)} USD</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-medium">
                          <span>Recipient receives:</span>
                          <span>
                            {transferCalculation.targetAmount} {transferCalculation.targetCurrency}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleSendMoney} 
                    className="w-full"
                    disabled={!transferCalculation || !recipient.trim()}
                  >
                    Send Money
                  </Button>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card className="gradient-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-primary">Transaction History</CardTitle>
                  <CardDescription>
                    Your recent money transfers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paginatedTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(transaction.status)}
                            <div>
                              <div className="flex items-center space-x-2">
                                {transaction.targetCurrency === 'GBP' ? (
                                  <ArrowUpRight className="w-4 h-4 text-blue-600" />
                                ) : (
                                  <ArrowDownLeft className="w-4 h-4 text-orange-600" />
                                )}
                                <span className="font-medium">
                                  {transaction.targetCurrency === 'GBP' ? 'UK' : 'South Africa'}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {transaction.recipient}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ${transaction.amount} → {transaction.targetAmount} {transaction.targetCurrency}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getStatusBadgeVariant(transaction.status)}>
                              {transaction.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {transaction.reference}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ads Section */}
            <div className="lg:col-span-1">
              <Card className="gradient-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-primary">ADs</CardTitle>
                  <CardDescription>
                    Helpful services for international students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden mb-4">
                      <img
                        src={ADS_DATA[currentAdIndex].image}
                        alt={ADS_DATA[currentAdIndex].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-medium text-primary mb-2">
                      {ADS_DATA[currentAdIndex].title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {ADS_DATA[currentAdIndex].description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full mb-4">
                      {ADS_DATA[currentAdIndex].cta}
                    </Button>
                    
                    {/* Navigation */}
                    <div className="flex justify-between">
                      <Button variant="ghost" size="sm" onClick={prevAd}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <div className="flex space-x-1">
                        {ADS_DATA.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentAdIndex ? 'bg-primary' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" onClick={nextAd}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}