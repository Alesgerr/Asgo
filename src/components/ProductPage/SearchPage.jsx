// SearchPage.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query'); // Arama sorgusunu al

  // Burada arama sorgusunu kullanarak işlemleri gerçekleştir
  // Örneğin, sorguyu kullanarak API'ye istek yapabilir ve sonuçları gösterebilirsin

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {/* Burada arama sonuçlarını göster */}
    </div>
  );
};

export default SearchPage;
