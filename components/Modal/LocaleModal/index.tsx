import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

const LocaleModal = ({
  isVisible,
  setLocaleModalVisible,
}: {
  isVisible: boolean;
  setLocaleModalVisible: Dispatch<SetStateAction<boolean>>;
}): JSX.Element | null => {
  if (!isVisible) return null;

  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation('footer');

  const language = [
    {
      display: '日本語',
      locale: 'jp',
    },
    {
      display: 'English',
      locale: 'en',
    },
  ];

  const handleLanguageChange = (payload: string) => {
    if (payload === locale) return false;

    router.push(`/${locale}`, `/${payload}`, {
      locale: `${payload}`,
    });

    handleModal();
  };

  const handleModal = () => {
    setLocaleModalVisible(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[350px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={handleModal}
        >
          X
        </button>
        <div className="bg-white p-5 rounded text-center ">
          <div className="mb-5">
            <p>{t('lang-title')}</p>
          </div>
          <ul>
            {language.map((lang: any, index: number) => (
              <li
                key={`${lang.locale}-${index}`}
                className={`my-3`}
                onClick={() => handleLanguageChange(lang.locale)}
                style={{ color: lang.locale === locale ? '#e1e1e1' : '#000' }}
              >
                {lang.display}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocaleModal;
