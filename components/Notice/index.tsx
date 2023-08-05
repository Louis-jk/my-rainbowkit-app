import { useTranslation } from 'react-i18next';
import Notice02 from './Notice02';
import Notice01 from './Notice01';

type NoticeType = 'notice01' | 'notice02';

interface NoticeProps {
  type: NoticeType;
}

const Notice = ({ type }: NoticeProps): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <div className="w-full mb-5">
      <div className="w-full mb-5">
        <p className="text-sm">{t('notice')}</p>
        {type === 'notice01' && <Notice01 />}
        {type === 'notice02' && <Notice02 />}
      </div>
    </div>
  );
};

export default Notice;
