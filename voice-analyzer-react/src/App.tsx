import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body text-center p-5">
              <h1 className="display-4 text-primary mb-4">
                <i className="bi bi-soundwave me-3"></i>
                Alzheimer & Parkinson Ses Analizi
              </h1>
              <p className="lead text-muted mb-4">
                React uygulaması başarıyla çalışıyor! 🎉
              </p>
              <div className="alert alert-success" role="alert">
                <strong>Başarı!</strong> Create React App ile React frontend düzgün şekilde yüklendi.
              </div>
              <div className="mt-4">
                <button className="btn btn-primary btn-lg me-3">
                  Giriş Yap
                </button>
                <button className="btn btn-outline-primary btn-lg">
                  Kayıt Ol
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
