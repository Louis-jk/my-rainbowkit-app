import { useTranslation } from 'react-i18next';

const Notice02 = (): JSX.Element => {
  const { t } = useTranslation('common', { keyPrefix: 'notice02' });

  return (
    <ul className="list-outside">
      <li>
        <small>{t('list01')}</small>
      </li>
      <li>
        <small>{t('list02')}</small>
      </li>
      <li>
        <small>{t('list03')}</small>
      </li>
      <li>
        <small>{t('list04')}</small>
      </li>
      <li>
        <small>{t('list05')}</small>
      </li>
      <li>
        <small>{t('list06')}</small>
      </li>
      <li>
        <small>{t('list07')}</small>
      </li>
    </ul>
  );
};

export default Notice02;
