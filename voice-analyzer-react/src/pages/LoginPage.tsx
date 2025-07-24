import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface LoginPageProps {
  setIsAuthenticated: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email.trim()) {
      setError('E-posta adresi gereklidir!');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Şifre gereklidir!');
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Geçerli bir e-posta adresi giriniz!');
      setLoading(false);
      return;
    }

    try {
      // Here you would make an API call to your backend
      // Example: const response = await fetch('http://localhost:8080/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   body: new URLSearchParams({
      //     email: email,
      //     password: password
      //   })
      // });
      
      // For demo purposes, we're simulating a successful login
      setTimeout(() => {
        // In real implementation, backend would set session cookie
        // For now, we'll use localStorage to simulate session
        localStorage.setItem('userToken', 'demo-session-token');
        localStorage.setItem('userEmail', email);
        
        // Handle remember me functionality
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Update authentication state
        setIsAuthenticated(true);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Giriş yapılamadı. Lütfen bilgilerinizi kontrol ediniz.');
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm border-0 rounded-3 my-5">
            <Card.Body className="p-4 p-sm-5">
              <div className="text-center mb-4">
                <h2 className="fs-4 fw-bold">Alzheimer & Parkinson</h2>
                <p className="text-muted">Ses Analiz Sistemine Hoş Geldiniz</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>E-posta</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Şifreniz"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check
                    type="checkbox"
                    id="rememberMe"
                    label="Beni hatırla"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <Link to="#" className="text-decoration-none small">
                    Şifremi Unuttum
                  </Link>
                </div>
                
                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                    className="text-uppercase fw-bold"
                  >
                    {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                  </Button>
                </div>
              </Form>
              
              <div className="text-center mt-4">
                <p className="small mb-0">
                  Hesabınız yok mu? <Link to="/register" className="text-decoration-none fw-semibold">Kayıt Olun</Link>
                </p>
              </div>
              
              <div className="text-center mt-3">
                <small className="text-muted">
                  Giriş yaparak <Link to="#" className="text-decoration-none">Kullanım Koşulları</Link> ve 
                  <Link to="#" className="text-decoration-none"> Gizlilik Politikası</Link>'nı kabul etmiş olursunuz.
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
