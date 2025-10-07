import { useTranslation } from 'react-i18next';

const Analytics = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {t('navigation.analytics')}
      </h1>
      <div className="text-center">
        <p className="text-gray-600 text-lg">{t('pages.analyticsData')}</p>
      </div>
    </div>
  );
};

export default Analytics;
