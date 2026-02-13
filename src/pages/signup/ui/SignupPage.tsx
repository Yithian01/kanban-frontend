// src/pages/signup/ui/SignupPage.tsx
import { SignupForm } from '@/features/auth/ui/SignupForm';

export const SignupPage = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>회원가입</h1>
      <SignupForm />
    </div>
  );
};