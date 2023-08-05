import i18next from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Footer = ({ setLocaleModalVisible }: { setLocaleModalVisible: any }) => {
  const { t } = useTranslation('footer');

  return (
    <div className="flex flex-col justify-center items-center w-full border-t-2 py-1">
      <ul className="flex flex-col justify-center items-center mt-5 mb-7">
        <li className="my-1">{t('site')}</li>
        <li className="my-1">{t('terms')}</li>
        <li className="my-1">{t('icsct')}</li>
        <li className="my-1">{t('privacy')}</li>
        <li className="my-1">{t('guide')}</li>
        <li className="my-1" onClick={() => setLocaleModalVisible(true)}>
          {t('lang')}
        </li>
      </ul>

      <div className="px-10 mb-5">
        <p className="text-sm text-center">©Copyright</p>
      </div>
    </div>
  );
};

export default Footer;
