import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/ui/navigation";
import { Shield, Clock, Globe, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 animate-fade-up">
            Send Money to Your
            <span className="gradient-hero bg-clip-text text-transparent"> Student Abroad</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up">
            Safe, fast, and affordable money transfers from Zimbabwe to the UK and South Africa. 
            Supporting thousands of families with their children's education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/signup">
                Start Sending Money
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link to="/login">Login to Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Families Trust WireMit
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Bank-Level Security</CardTitle>
                <CardDescription>
                  Your money and data are protected with military-grade encryption
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader className="text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Fast Transfers</CardTitle>
                <CardDescription>
                  Money reaches your student in minutes, not days
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader className="text-center">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>UK & South Africa</CardTitle>
                <CardDescription>
                  Seamless transfers to GBP and ZAR with competitive rates
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">UK Transfers</CardTitle>
                <CardDescription>Send money to students in the United Kingdom</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-4">10% Fee</div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-2" />
                    Converts to British Pounds (GBP)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-2" />
                    Real-time exchange rates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-2" />
                    $5 - $2,000 per transfer
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-accent">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">South Africa Transfers</CardTitle>
                <CardDescription>Send money to students in South Africa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-4">20% Fee</div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-2" />
                    Converts to South African Rand (ZAR)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-2" />
                    Real-time exchange rates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-2" />
                    $5 - $2,000 per transfer
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Ready to Support Your Student?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of Zimbabwean families who trust WireMit for their international transfers.
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-6">
            <Link to="/signup">
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold">WireMit</span>
          </div>
          <p className="text-primary-foreground/80">
            Empowering Zimbabwean families to support their children's education abroad.
          </p>
        </div>
      </footer>
    </div>
  );
}