import { useState } from 'react';
import AddIssueModal from '../AddIssueModal';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

const DropdownMenu = () => {
  const [isDown, setIsDown] = useState(false);
  const { t } = useTranslation();

  return (
    <aside className={`absolute ${isDown ? 'top-0' : 'top-[-80vh]'} left-0 duration-[1s]`}>
      <div
        className={`z-[2] h-[80vh] w-[25vw] rounded-[0_0_50px_0] bg-headerText duration-[0.5s] ${
          isDown && 'shadow-[0_0_15px_25px_#00000043]'
        }`}
      >
        <ul className="flex h-full w-full flex-col items-center justify-center gap-10 text-3xl text-white">
          <li className="button">{t('rename_board')}</li>
          <li className="button">{t('add_table')}</li>
          <AddIssueModal />
          <li className="button">{t('delete_board')}</li>
        </ul>
      </div>
      <div
        className="button z-1 ml-6 h-[10px] w-[10px] border-[30px] border-t-[70px] border-headerText border-b-transparent"
        onClick={() => setIsDown(!isDown)}
      ></div>
    </aside>
  );
};

export default DropdownMenu;
