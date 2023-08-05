import { useTranslation } from 'react-i18next';

const Notice01 = (): JSX.Element => {
  const { t } = useTranslation('common', { keyPrefix: 'notice01' });

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
    </ul>
  );
};

export default Notice01;
