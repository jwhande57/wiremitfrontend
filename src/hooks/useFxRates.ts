import { useState, useEffect } from 'react';
import axios from 'axios';

export interface FxRates {
  GBP: number;
  ZAR: number;
  lastUpdated: string;
}

export const useFxRates = () => {
  const [rates, setRates] = useState<FxRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get('https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS');
      const data = response.data;

      // Handle array of single-key objects
      let gbpRate: number | undefined;
      let zarRate: number | undefined;

      for (const obj of data) {
        if (obj.GBP !== undefined) gbpRate = obj.GBP;
        if (obj.ZAR !== undefined) zarRate = obj.ZAR;
      }

      if (gbpRate === undefined || zarRate === undefined) {
        throw new Error('Required currency rates not found');
      }

      const fxRates: FxRates = {
        GBP: parseFloat(String(gbpRate)),
        ZAR: parseFloat(String(zarRate)),
        lastUpdated: new Date().toISOString()
      };

      setRates(fxRates);

      // Cache rates in localStorage for offline use
      localStorage.setItem('wiremit_fx_rates', JSON.stringify(fxRates));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rates');

      // Try to load cached rates
      const cachedRates = localStorage.getItem('wiremit_fx_rates');
      if (cachedRates) {
        setRates(JSON.parse(cachedRates));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load cached rates immediately
    const cachedRates = localStorage.getItem('wiremit_fx_rates');
    if (cachedRates) {
      setRates(JSON.parse(cachedRates));
      setIsLoading(false);
    }
    
    // Then fetch fresh rates
    fetchRates();
  }, []);

  return { rates, isLoading, error, refetch: fetchRates };
};
