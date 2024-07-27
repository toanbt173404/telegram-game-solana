// src/pages/login.tsx
import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import styles from '@/styles/login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Please enter your email</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
{/*         <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
