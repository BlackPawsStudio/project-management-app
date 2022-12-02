import Image from 'next/image';
import Link from 'next/link';
import githubIcon from 'public/assets/icons/github-icon.svg';
import rssIcon from 'public/assets/icons/rs-school-logo.svg';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

export const authorsArray = ['BlackP(awsStudio', 'maiklshetinin', 'vvsar'];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      className={`mt-auto hidden h-fit w-screen items-center justify-between bg-header
      p-[10px] text-2xl text-headerText lg:flex lg:h-[10vh] lg:p-[0_45px]`}
    >
      <Link href="https://rs.school/react/" className="flex items-end">
        <Image src={rssIcon} alt="RSS logo" height={40} />
        <label className="text-[26px] font-extrabold leading-[82%]">2022</label>
      </Link>
      <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
        <p>{t('authors')} </p>
        {authorsArray.map((el, id) => (
          <Link href={`https://github.com/${el}`} target="blank" className="flex items-center gap-0.5" key={id}>
            <Image src={githubIcon} alt="" height={30} />
            {el}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
