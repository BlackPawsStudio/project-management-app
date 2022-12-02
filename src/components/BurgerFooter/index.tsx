import Image from 'next/image';
import Link from 'next/link';
import githubIcon from 'public/assets/icons/github-icon.svg';
import rssIcon from 'public/assets/icons/rs-school-logo.svg';
import { useTranslation } from 'react-i18next';
import { authorsArray } from '../Footer';
import '../../utils/i18next';

const BurgerFooter = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="absolute bottom-0 mt-auto flex h-fit w-full flex-col justify-between
      gap-1 bg-header p-[10px] text-2xl text-headerText"
    >
      <Link href="https://rs.school/react/" className="flex items-end">
        <Image src={rssIcon} alt="RSS logo" height={40} />
        <label className="text-[26px] font-extrabold leading-[82%]">2022</label>
      </Link>
      <div className="mt-[5px] flex flex-col justify-between gap-1 border-t-2 border-headerText lg:flex-row">
        <p className="text-start">{t('authors')} </p>
        {authorsArray.map((el, id) => (
          <Link href={`https://github.com/${el}`} target="blank" className="flex items-center gap-0.5" key={id}>
            <Image src={githubIcon} alt="" height={30} className="scale-75 lg:scale-100" />
            {el}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default BurgerFooter;
