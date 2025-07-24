import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Alert } from 'react-bootstrap';

interface HistoryItem {
  id: string;
  fileName: string;
  analysisDate: string;
  riskScore: number;
  riskLevel: 'Düşük' | 'Orta' | 'Yüksek';
  explanation: string;
}

const HistoryPage: React.FC = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch history
    setTimeout(() => {
      const mockHistory: HistoryItem[] = [
        {
          id: '1',
          fileName: 'ses_kayit_1.wav',
          analysisDate: '2025-01-20 14:30',
          riskScore: 25,
          riskLevel: 'Düşük',
          explanation: 'Ses analizinizde normal parametreler tespit edildi.'
        },
        {
          id: '2',
          fileName: 'konusma_ornegi.mp3',
          analysisDate: '2025-01-18 10:15',
          riskScore: 65,
          riskLevel: 'Orta',
          explanation: 'Bazı risk faktörleri tespit edildi, takip önerilir.'
        },
        {
          id: '3',
          fileName: 'test_ses.wav',
          analysisDate: '2025-01-15 16:45',
          riskScore: 85,
          riskLevel: 'Yüksek',
          explanation: 'Yüksek risk faktörleri tespit edildi, doktor kontrolü önerilir.'
        }
      ];
      setHistoryItems(mockHistory);
      setLoading(false);
    }, 1000);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Düşük': return 'success';
      case 'Orta': return 'warning';
      case 'Yüksek': return 'danger';
      default: return 'secondary';
    }
  };

  const handleViewDetails = (item: HistoryItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDeleteItem = (id: string) => {
    setHistoryItems(historyItems.filter(item => item.id !== id));
    // In real implementation, you would make an API call to delete the item
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 40) return 'text-success';
    if (score < 70) return 'text-warning';
    return 'text-danger';
  };

  return (
    <Container>
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold text-primary">Geçmiş Analizler</h1>
        <p className="lead text-muted">
          Daha önce yaptığınız ses analizlerini görüntüleyin ve karşılaştırın
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
        </div>
      ) : historyItems.length === 0 ? (
        <Card className="shadow-sm border-0 rounded-3">
          <Card.Body className="text-center py-5">
            <i className="bi bi-clock-history text-muted" style={{ fontSize: '4rem' }}></i>
            <h3 className="fw-bold mt-3">Henüz Analiz Yok</h3>
            <p className="text-muted mb-4">
              Henüz hiç ses analizi yapmadınız. İlk analizinizi yapmak için aşağıdaki butona tıklayın.
            </p>
            <Button variant="primary" size="lg" href="/analysis">
              İlk Analizimi Yap
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          {/* Summary Cards */}
          <Row className="mb-4">
            <Col md={4}>
              <Card className="bg-primary text-white border-0 rounded-3">
                <Card.Body className="text-center">
                  <h3 className="fw-bold">{historyItems.length}</h3>
                  <p className="mb-0">Toplam Analiz</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="bg-success text-white border-0 rounded-3">
                <Card.Body className="text-center">
                  <h3 className="fw-bold">
                    {historyItems.filter(item => item.riskLevel === 'Düşük').length}
                  </h3>
                  <p className="mb-0">Düşük Risk</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="bg-danger text-white border-0 rounded-3">
                <Card.Body className="text-center">
                  <h3 className="fw-bold">
                    {historyItems.filter(item => item.riskLevel === 'Yüksek').length}
                  </h3>
                  <p className="mb-0">Yüksek Risk</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* History Table */}
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 px-4 py-3">Dosya Adı</th>
                      <th className="border-0 px-4 py-3">Tarih</th>
                      <th className="border-0 px-4 py-3">Risk Skoru</th>
                      <th className="border-0 px-4 py-3">Risk Seviyesi</th>
                      <th className="border-0 px-4 py-3">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <i className="bi bi-file-earmark-music me-2 text-muted"></i>
                          {item.fileName}
                        </td>
                        <td className="px-4 py-3 text-muted">{item.analysisDate}</td>
                        <td className="px-4 py-3">
                          <span className={`fw-bold ${getRiskScoreColor(item.riskScore)}`}>
                            {item.riskScore}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge bg={getRiskColor(item.riskLevel)}>
                            {item.riskLevel}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleViewDetails(item)}
                          >
                            Detaylar
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            Sil
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </>
      )}

      {/* Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Analiz Detayları</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Dosya Adı:</strong> {selectedItem.fileName}
                </Col>
                <Col md={6}>
                  <strong>Analiz Tarihi:</strong> {selectedItem.analysisDate}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Risk Skoru:</strong> 
                  <span className={`ms-2 fw-bold ${getRiskScoreColor(selectedItem.riskScore)}`}>
                    {selectedItem.riskScore}
                  </span>
                </Col>
                <Col md={6}>
                  <strong>Risk Seviyesi:</strong> 
                  <Badge bg={getRiskColor(selectedItem.riskLevel)} className="ms-2">
                    {selectedItem.riskLevel}
                  </Badge>
                </Col>
              </Row>
              <div>
                <strong>Açıklama:</strong>
                <p className="mt-2 text-muted">{selectedItem.explanation}</p>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HistoryPage;
