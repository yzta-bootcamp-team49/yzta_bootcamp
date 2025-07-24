import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

interface NavigationProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage/session
    localStorage.removeItem('userToken');
    // Update authentication state
    setIsAuthenticated(false);
    // Redirect to login page
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo.jpeg"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Alzheimer & Parkinson Logo"
          />
          Alzheimer & Parkinson Ses Analizi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/dashboard">Ana Sayfa</Nav.Link>
                <Nav.Link as={Link} to="/analysis">Ses Analizi</Nav.Link>
                <Nav.Link as={Link} to="/history">Geçmiş Analizler</Nav.Link>
                <Nav.Link as={Link} to="/statistics">İstatistikler</Nav.Link>
                <Button variant="outline-light" onClick={handleLogout} className="ms-2">Çıkış Yap</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Giriş</Nav.Link>
                <Nav.Link as={Link} to="/register">Kayıt Ol</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
