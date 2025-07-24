import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <Container>
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Hoş Geldiniz!</h1>
        <p className="lead text-muted">
          Alzheimer ve Parkinson hastalıklarının erken teşhisine yardımcı olmak için ses analizinizi başlatın.
        </p>
      </div>

      <Row className="g-4">
        {/* Yeni Analiz Kartı */}
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm border-0 rounded-3">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <i className="bi bi-mic-fill text-primary" style={{ fontSize: '3rem' }}></i>
              </div>
              <Card.Title className="h4 fw-bold">Yeni Ses Analizi</Card.Title>
              <Card.Text className="text-muted mb-4">
                Ses dosyanızı yükleyerek AI destekli analiz başlatın ve risk skorunuzu öğrenin.
              </Card.Text>
              <Button as={Link} to="/analysis" variant="primary" size="lg" className="w-100">
                Analiz Başlat
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Geçmiş Analizler Kartı */}
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm border-0 rounded-3">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <i className="bi bi-clock-history text-success" style={{ fontSize: '3rem' }}></i>
              </div>
              <Card.Title className="h4 fw-bold">Geçmiş Analizler</Card.Title>
              <Card.Text className="text-muted mb-4">
                Daha önce yaptığınız analizleri görüntüleyin ve sonuçları karşılaştırın.
              </Card.Text>
              <Button as={Link} to="/history" variant="success" size="lg" className="w-100">
                Geçmişi Görüntüle
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* İstatistikler Kartı */}
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm border-0 rounded-3">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <i className="bi bi-bar-chart-fill text-info" style={{ fontSize: '3rem' }}></i>
              </div>
              <Card.Title className="h4 fw-bold">İstatistiklerim</Card.Title>
              <Card.Text className="text-muted mb-4">
                Kişisel analiz istatistiklerinizi ve risk trendlerinizi inceleyin.
              </Card.Text>
              <Button as={Link} to="/statistics" variant="info" size="lg" className="w-100">
                İstatistikleri Gör
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bilgilendirme Bölümü */}
      <Row className="mt-5">
        <Col>
          <Card className="bg-light border-0 rounded-3">
            <Card.Body className="p-4">
              <h3 className="fw-bold mb-3">Nasıl Çalışır?</h3>
              <Row>
                <Col md={4} className="mb-3">
                  <div className="d-flex align-items-start">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      <span className="fw-bold">1</span>
                    </div>
                    <div>
                      <h5 className="fw-bold">Ses Kayıt</h5>
                      <p className="text-muted small mb-0">
                        Ses dosyanızı sisteme yükleyin veya doğrudan kayıt yapın.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="d-flex align-items-start">
                    <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      <span className="fw-bold">2</span>
                    </div>
                    <div>
                      <h5 className="fw-bold">AI Analizi</h5>
                      <p className="text-muted small mb-0">
                        Google Gemini AI ile ses özellikleriniz analiz edilir.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="d-flex align-items-start">
                    <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      <span className="fw-bold">3</span>
                    </div>
                    <div>
                      <h5 className="fw-bold">Sonuç</h5>
                      <p className="text-muted small mb-0">
                        Risk skorunuz ve detaylı açıklamalar sunulur.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
