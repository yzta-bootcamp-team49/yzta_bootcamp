import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterPageProps {
  setIsAuthenticated: (value: boolean) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Format phone number as user types
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      
      if (cleaned.length > 0) {
        if (cleaned.length <= 3) {
          formatted = cleaned;
        } else if (cleaned.length <= 6) {
          formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
        } else if (cleaned.length <= 8) {
          formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
        } else {
          formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
        }
      }
      
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Ad ve soyad alanları zorunludur!');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Geçerli bir e-posta adresi giriniz!');
      return;
    }

    // Validate phone number (Turkish format)
    const phoneRegex = /^0[5][0-9]{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setError('Geçerli bir telefon numarası giriniz! (05XX XXX XX XX)');
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor!');
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Şifre en az 8 karakter uzunluğunda olmalıdır!');
      return;
    }

    setLoading(true);

    try {
      // Here you would make an API call to your backend
      // Example: const response = await fetch('/api/auth/register', {...})
      
      // For demo purposes, we're simulating a successful registration
      setTimeout(() => {
        // Store the token in localStorage after successful registration
        localStorage.setItem('userToken', 'demo-token-12345');
        // Update authentication state
        setIsAuthenticated(true);
        setLoading(false);
        // Redirect to dashboard
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError('Kayıt oluşturulamadı. Lütfen tekrar deneyiniz.');
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0 rounded-3 my-5">
            <Card.Body className="p-4 p-sm-5">
              <div className="text-center mb-4">
                <h2 className="fs-4 fw-bold">Yeni Hesap Oluşturun</h2>
                <p className="text-muted">Alzheimer & Parkinson Ses Analiz Sistemine Kayıt</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ad</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Adınız"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Soyad</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Soyadınız"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>E-posta</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="E-posta adresiniz"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Telefon Numarası</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="05XX XXX XX XX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Telefon numaranızı başında 0 ile birlikte giriniz.
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="En az 8 karakter"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                  />
                  <Form.Text className="text-muted">
                    Şifreniz en az 8 karakter uzunluğunda olmalıdır.
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Şifre Tekrar</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Şifrenizi tekrar girin"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    minLength={8}
                    required
                  />
                </Form.Group>
                
                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                    className="text-uppercase fw-bold"
                  >
                    {loading ? 'Kayıt Oluşturuluyor...' : 'Kayıt Ol'}
                  </Button>
                </div>
              </Form>
              
              <div className="text-center mt-4">
                <p className="small mb-0">
                  Zaten hesabınız var mı? <Link to="/login" className="text-decoration-none">Giriş Yapın</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
