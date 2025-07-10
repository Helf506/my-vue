import React from 'react';
import i18n from './i18n';
import { useTranslation } from 'react-i18next'; // 如果使用react-i18next

function App() {
  const { t } = useTranslation(); // React专用钩子

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('content')}</p>
      <LanguageSwitcher />
    </div>
  );
}