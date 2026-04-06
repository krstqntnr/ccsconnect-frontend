import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import api from '../utils/api';

const VerifyRegistration = () => {
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No verification token found.');
      return;
    }

    const verify = async () => {
      try {
        const response = await api.post('/auth/verify-registration', null, { params: { token } });
        setStatus('success');
        setMessage(response.data.message || 'Account verified! Check your email for the temporary password.');
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.detail || 'Verification failed. The link may be invalid or expired.');
      }
    };
    verify();
  }, [location]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <Card className="max-w-md w-full border-0 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Account Verification</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === 'loading' && (
            <>
              <Loader2 className="w-12 h-12 mx-auto text-gray-500 animate-spin" />
              <p>Verifying your account...</p>
            </>
          )}
          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
              <p className="text-green-700 font-medium">{message}</p>
              <Button onClick={() => navigate('/login')} className="mt-4">Go to Login</Button>
            </>
          )}
          {status === 'error' && (
            <>
              <XCircle className="w-16 h-16 mx-auto text-red-500" />
              <p className="text-red-700">{message}</p>
              <Button onClick={() => navigate('/register')} variant="outline" className="mt-4">Back to Registration</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyRegistration;