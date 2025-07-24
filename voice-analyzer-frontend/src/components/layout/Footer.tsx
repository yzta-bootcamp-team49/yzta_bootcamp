import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-4">
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <h5>Alzheimer & Parkinson Ses Analiz Sistemi</h5>
            <p className="text-muted">
              Bu web uygulaması, Alzheimer ve Parkinson hastalıklarının erken teşhisine yardımcı olmak amacıyla geliştirilmiştir.
            </p>
          </Col>
          <Col md={3} className="mb-3 mb-md-0">
            <h5>Bağlantılar</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-muted">Hakkımızda</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Gizlilik Politikası</a></li>
              <li><a href="#" className="text-decoration-none text-muted">İletişim</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>İletişim</h5>
            <ul className="list-unstyled text-muted">
              <li>Email: iletisim@example.com</li>
              <li>Telefon: (123) 456-7890</li>
            </ul>
          </Col>
        </Row>
        <hr />
        <div className="text-center">
          <p className="mb-0 text-muted">© {new Date().getFullYear()} Grup 49 - Tüm hakları saklıdır.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
