import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar, Badge } from 'react-bootstrap';

interface AnalysisResult {
  riskScore: number;
  riskLevel: 'Düşük' | 'Orta' | 'Yüksek';
  explanation: string;
  recommendations: string[];
  analysisDate: string;
}

const AnalysisPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/ogg'];
      if (!allowedTypes.includes(file.type)) {
        setError('Lütfen geçerli bir ses dosyası seçin (WAV, MP3, OGG)');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Dosya boyutu 10MB\'dan küçük olmalıdır');
        return;
      }
      
      setSelectedFile(file);
      setError('');
    }
  };

  const handleAnalysis = async () => {
    if (!selectedFile) {
      setError('Lütfen bir ses dosyası seçin');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // Simulate API call to backend
      // In real implementation, you would upload the file and get analysis results
      setTimeout(() => {
        // Mock analysis result
        const mockResult: AnalysisResult = {
          riskScore: Math.floor(Math.random() * 100),
          riskLevel: Math.random() > 0.5 ? 'Düşük' : Math.random() > 0.3 ? 'Orta' : 'Yüksek',
          explanation: 'Ses analiziniz tamamlandı. Sonuçlar ses tonunuz, konuşma hızınız ve diğer akustik özellikler temel alınarak hesaplanmıştır.',
          recommendations: [
            'Düzenli egzersiz yapın',
            'Dengeli beslenin',
            'Doktorunuzla görüşün',
            'Stres yönetimi teknikleri uygulayın'
          ],
          analysisDate: new Date().toLocaleString('tr-TR')
        };
        
        setAnalysisResult(mockResult);
        setIsAnalyzing(false);
      }, 3000);
    } catch (err) {
      setError('Analiz sırasında bir hata oluştu. Lütfen tekrar deneyiniz.');
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Düşük': return 'success';
      case 'Orta': return 'warning';
      case 'Yüksek': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="text-center mb-4">
            <h1 className="display-5 fw-bold text-primary">Ses Analizi</h1>
            <p className="lead text-muted">
              Ses dosyanızı yükleyerek AI destekli analiz başlatın
            </p>
          </div>

          {/* File Upload Section */}
          <Card className="shadow-sm border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <h3 className="fw-bold mb-3">Ses Dosyası Yükleme</h3>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form.Group className="mb-3">
                <Form.Label>Ses Dosyası Seçin</Form.Label>
                <Form.Control
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  disabled={isAnalyzing}
                />
                <Form.Text className="text-muted">
                  Desteklenen formatlar: WAV, MP3, OGG (Maksimum 10MB)
                </Form.Text>
              </Form.Group>

              {selectedFile && (
                <div className="mb-3">
                  <Alert variant="info">
                    <strong>Seçilen dosya:</strong> {selectedFile.name} 
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </Alert>
                </div>
              )}

              <div className="d-grid">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAnalysis}
                  disabled={!selectedFile || isAnalyzing}
                >
                  {isAnalyzing ? 'Analiz Ediliyor...' : 'Analizi Başlat'}
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <Card className="shadow-sm border-0 rounded-3 mb-4">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3">Analiz İşlemi</h4>
                <ProgressBar animated now={100} className="mb-3" />
                <p className="text-muted mb-0">
                  Ses dosyanız AI tarafından analiz ediliyor. Bu işlem birkaç dakika sürebilir...
                </p>
              </Card.Body>
            </Card>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <Card className="shadow-sm border-0 rounded-3">
              <Card.Body className="p-4">
                <h3 className="fw-bold mb-4">Analiz Sonuçları</h3>
                
                <Row className="mb-4">
                  <Col md={6}>
                    <div className="text-center">
                      <h2 className="display-4 fw-bold text-primary">{analysisResult.riskScore}</h2>
                      <p className="text-muted">Risk Skoru (0-100)</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="text-center">
                      <Badge 
                        bg={getRiskColor(analysisResult.riskLevel)} 
                        className="fs-5 px-3 py-2"
                      >
                        {analysisResult.riskLevel} Risk
                      </Badge>
                      <p className="text-muted mt-2">Risk Seviyesi</p>
                    </div>
                  </Col>
                </Row>

                <div className="mb-4">
                  <h4 className="fw-bold">Açıklama</h4>
                  <p className="text-muted">{analysisResult.explanation}</p>
                </div>

                <div className="mb-4">
                  <h4 className="fw-bold">Öneriler</h4>
                  <ul className="list-unstyled">
                    {analysisResult.recommendations.map((recommendation, index) => (
                      <li key={index} className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-muted small">
                  <strong>Analiz Tarihi:</strong> {analysisResult.analysisDate}
                </div>

                <div className="d-grid mt-4">
                  <Button 
                    variant="outline-primary" 
                    onClick={() => {
                      setAnalysisResult(null);
                      setSelectedFile(null);
                    }}
                  >
                    Yeni Analiz Yap
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AnalysisPage;
