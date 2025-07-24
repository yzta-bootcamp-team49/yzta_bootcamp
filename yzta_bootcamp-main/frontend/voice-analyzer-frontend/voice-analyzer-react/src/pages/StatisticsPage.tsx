import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';

interface StatisticsData {
  totalAnalyses: number;
  averageRiskScore: number;
  lowRiskCount: number;
  mediumRiskCount: number;
  highRiskCount: number;
  monthlyAnalyses: { month: string; count: number }[];
  riskTrend: 'improving' | 'stable' | 'worsening';
}

const StatisticsPage: React.FC = () => {
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch statistics
    setTimeout(() => {
      const mockStatistics: StatisticsData = {
        totalAnalyses: 15,
        averageRiskScore: 45,
        lowRiskCount: 8,
        mediumRiskCount: 5,
        highRiskCount: 2,
        monthlyAnalyses: [
          { month: 'Ocak', count: 3 },
          { month: 'Şubat', count: 5 },
          { month: 'Mart', count: 7 }
        ],
        riskTrend: 'improving'
      };
      setStatistics(mockStatistics);
      setLoading(false);
    }, 1000);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return { icon: 'bi-arrow-down-circle-fill', color: 'text-success', text: 'İyileşiyor' };
      case 'worsening': return { icon: 'bi-arrow-up-circle-fill', color: 'text-danger', text: 'Kötüleşiyor' };
      default: return { icon: 'bi-dash-circle-fill', color: 'text-warning', text: 'Stabil' };
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 40) return 'success';
    if (score < 70) return 'warning';
    return 'danger';
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (!statistics) {
    return (
      <Container>
        <div className="text-center py-5">
          <h3>İstatistik verileri yüklenemedi</h3>
        </div>
      </Container>
    );
  }

  const trendInfo = getTrendIcon(statistics.riskTrend);

  return (
    <Container>
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold text-primary">Kişisel İstatistikler</h1>
        <p className="lead text-muted">
          Analiz geçmişinize dayalı detaylı istatistikler ve trendler
        </p>
      </div>

      {/* Overview Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="bg-primary text-white border-0 rounded-3 h-100">
            <Card.Body className="text-center">
              <i className="bi bi-graph-up" style={{ fontSize: '2.5rem' }}></i>
              <h3 className="fw-bold mt-2">{statistics.totalAnalyses}</h3>
              <p className="mb-0">Toplam Analiz</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className={`bg-${getRiskScoreColor(statistics.averageRiskScore)} text-white border-0 rounded-3 h-100`}>
            <Card.Body className="text-center">
              <i className="bi bi-speedometer2" style={{ fontSize: '2.5rem' }}></i>
              <h3 className="fw-bold mt-2">{statistics.averageRiskScore}</h3>
              <p className="mb-0">Ortalama Risk Skoru</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="bg-info text-white border-0 rounded-3 h-100">
            <Card.Body className="text-center">
              <i className={`${trendInfo.icon}`} style={{ fontSize: '2.5rem' }}></i>
              <h3 className="fw-bold mt-2">{trendInfo.text}</h3>
              <p className="mb-0">Risk Trendi</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="bg-secondary text-white border-0 rounded-3 h-100">
            <Card.Body className="text-center">
              <i className="bi bi-calendar-month" style={{ fontSize: '2.5rem' }}></i>
              <h3 className="fw-bold mt-2">
                {statistics.monthlyAnalyses[statistics.monthlyAnalyses.length - 1]?.count || 0}
              </h3>
              <p className="mb-0">Bu Ay</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Risk Distribution */}
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 rounded-3 h-100">
            <Card.Body className="p-4">
              <h3 className="fw-bold mb-4">Risk Dağılımı</h3>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold text-success">Düşük Risk</span>
                  <span className="text-muted">{statistics.lowRiskCount} analiz</span>
                </div>
                <ProgressBar 
                  variant="success" 
                  now={(statistics.lowRiskCount / statistics.totalAnalyses) * 100} 
                  className="mb-3"
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold text-warning">Orta Risk</span>
                  <span className="text-muted">{statistics.mediumRiskCount} analiz</span>
                </div>
                <ProgressBar 
                  variant="warning" 
                  now={(statistics.mediumRiskCount / statistics.totalAnalyses) * 100} 
                  className="mb-3"
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold text-danger">Yüksek Risk</span>
                  <span className="text-muted">{statistics.highRiskCount} analiz</span>
                </div>
                <ProgressBar 
                  variant="danger" 
                  now={(statistics.highRiskCount / statistics.totalAnalyses) * 100} 
                />
              </div>

              <div className="text-center mt-4">
                <small className="text-muted">
                  Toplam {statistics.totalAnalyses} analizin dağılımı
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Monthly Analysis Trend */}
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 rounded-3 h-100">
            <Card.Body className="p-4">
              <h3 className="fw-bold mb-4">Aylık Analiz Trendi</h3>
              
              {statistics.monthlyAnalyses.map((monthData, index) => (
                <div key={index} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">{monthData.month}</span>
                    <span className="text-muted">{monthData.count} analiz</span>
                  </div>
                  <ProgressBar 
                    variant="primary" 
                    now={(monthData.count / Math.max(...statistics.monthlyAnalyses.map(m => m.count))) * 100}
                    className="mb-2"
                  />
                </div>
              ))}

              <div className="text-center mt-4">
                <small className="text-muted">
                  Son 3 ayın analiz aktivitesi
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recommendations */}
      <Row>
        <Col>
          <Card className="bg-light border-0 rounded-3">
            <Card.Body className="p-4">
              <h3 className="fw-bold mb-3">Kişiselleştirilmiş Öneriler</h3>
              <Row>
                <Col md={4} className="mb-3">
                  <div className="d-flex align-items-start">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-heart-pulse"></i>
                    </div>
                    <div>
                      <h5 className="fw-bold">Sağlık Takibi</h5>
                      <p className="text-muted small mb-0">
                        Düzenli analiz yaparak sağlık durumunuzu takip edin.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="d-flex align-items-start">
                    <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-graph-up-arrow"></i>
                    </div>
                    <div>
                      <h5 className="fw-bold">Trend Analizi</h5>
                      <p className="text-muted small mb-0">
                        Risk skorlarınızdaki değişimleri izleyin.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="d-flex align-items-start">
                    <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-person-check"></i>
                    </div>
                    <div>
                      <h5 className="fw-bold">Uzman Desteği</h5>
                      <p className="text-muted small mb-0">
                        Yüksek risk durumunda doktor kontrolü yaptırın.
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

export default StatisticsPage;
