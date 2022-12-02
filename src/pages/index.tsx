import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import '../utils/i18next';
import PageBase from '../components/PageBase';
import githubIcon from 'public/assets/icons/github-icon-black.svg';
import nextjsIcon from 'public/assets/component-images/tech-icons/nextjs.jpg';
import nextjsHoverIcon from 'public/assets/component-images/tech-icons/nextjs_hover.jpg';
import typescriptIcon from 'public/assets/component-images/tech-icons/typescript.jpg';
import typescriptHoverIcon from 'public/assets/component-images/tech-icons/typescript_hover.jpg';
import reactQueryIcon from 'public/assets/component-images/tech-icons/reactquery.jpg';
import reactQueryHoverIcon from 'public/assets/component-images/tech-icons/reactquery_hover.jpg';
import i18nextIcon from 'public/assets/component-images/tech-icons/i18next.jpg';
import i18nextHoverIcon from 'public/assets/component-images/tech-icons/i18next_hover.jpg';
import zustandIcon from 'public/assets/component-images/tech-icons/zustand.jpg';
import zustandHoverIcon from 'public/assets/component-images/tech-icons/zustand_hover.jpg';
import figmaIcon from 'public/assets/component-images/tech-icons/figma.jpg';
import figmaHoverIcon from 'public/assets/component-images/tech-icons/figma_hover.jpg';
import { useTranslation } from 'react-i18next';
import '../utils/i18next';

const Home: NextPage = () => {
  const { t } = useTranslation();

  const h4Style = 'text-[Inter] text-[24px] text-primaryText leading-8 my-[20px] font-bold';
  const pStyle = 'text-[Inter] text-[24px] text-primaryText indent-8 leading-8';

  return (
    <PageBase title={t('start_title') as string} onSubmit={(str) => {}}>
      <div className="ml-[8%] h-[100%] overflow-auto">
        <h4 className={h4Style}>{t('start_1')}</h4>
        <h4 className={h4Style}>{t('start_2')}</h4>
        <div className="flex gap-6">
          <div className="relative h-[72px] w-[72px] bg-cover bg-center">
            <Link href="https://nextjs.org/">
              <Image className="left 0 absolute top-0" src={nextjsHoverIcon} alt="nextjs logo" height={72} />
              <Image
                className="left 0 absolute top-0 duration-100 hover:opacity-0"
                src={nextjsIcon}
                alt="nextjs logo"
                height={72}
              />
            </Link>
          </div>
          <div className="relative h-[72px] w-[72px] bg-cover bg-center">
            <Link href="https://www.typescriptlang.org/">
              <Image className="left 0 absolute top-0" src={typescriptHoverIcon} alt="typescript logo" height={72} />
              <Image
                className="left 0 absolute top-0 duration-100 hover:opacity-0"
                src={typescriptIcon}
                alt="typescript logo"
                height={72}
              />
            </Link>
          </div>
          <div className="relative h-[72px] w-[72px] bg-cover bg-center">
            <Link href="https://tanstack.com/query/v4/">
              <Image className="left 0 absolute top-0" src={reactQueryHoverIcon} alt="react query logo" height={72} />
              <Image
                className="left 0 absolute top-0 duration-100 hover:opacity-0"
                src={reactQueryIcon}
                alt="react query logo"
                height={72}
              />
            </Link>
          </div>
          <div className="relative h-[72px] w-[72px] bg-cover bg-center">
            <Link href="https://www.i18next.com/">
              <Image className="left 0 absolute top-0" src={i18nextHoverIcon} alt="i18next logo" height={72} />
              <Image
                className="left 0 absolute top-0 duration-100 hover:opacity-0"
                src={i18nextIcon}
                alt="i18next logo"
                height={72}
              />
            </Link>
          </div>
          <div className="relative h-[72px] w-[72px] bg-cover bg-center">
            <Link href="https://github.com/pmndrs/zustand/">
              <Image className="left 0 absolute top-0" src={zustandHoverIcon} alt="zustand logo" height={72} />
              <Image
                className="left 0 absolute top-0 duration-100 hover:opacity-0"
                src={zustandIcon}
                alt="zustand logo"
                height={72}
              />
            </Link>
          </div>
          <div className="relative h-[72px] w-[72px] bg-cover bg-center">
            <Link href="https://figma.com/">
              <Image className="left 0 absolute top-0" src={figmaHoverIcon} alt="figma logo" height={72} />
              <Image
                className="left 0 absolute top-0 duration-100 hover:opacity-0"
                src={figmaIcon}
                alt="figma logo"
                height={72}
              />
            </Link>
          </div>
        </div>
        <h4 className={h4Style}>{t('start_3')}</h4>
        <ul className="ml-[10px]">
          <li className={`${pStyle} indent-3`}>
            <Link href="https://github.com/BlackPawsStudio" className="flex items-center">
              <Image src={githubIcon} alt="github logo" height={25} />
              BlackPawsStudio - {t('teamlead')}
            </Link>
          </li>
          <li className={`${pStyle} indent-3`}>
            <Link href="https://github.com/maiklshetinin" className="flex items-center">
              <Image src={githubIcon} alt="github logo" height={25} />
              mailkshetinin - {t('fe_dev')}
            </Link>
          </li>
          <li className={`${pStyle} indent-3`}>
            <Link href="https://github.com/vvsar" className="flex items-center">
              <Image src={githubIcon} alt="github logo" height={25} />
              vvsar - {t('fe_dev')}
            </Link>
          </li>
          <li className={`${pStyle} indent-3`}>
            <Link href="https://github.com/WinglessFrame" className="flex items-center">
              <Image src={githubIcon} alt="github logo" height={25} />
              WinglessFrame - {t('mentor')}
            </Link>
          </li>
        </ul>
        <h4 className={h4Style}>{t('start_4')}</h4>
        <p className={pStyle}>{t('start_5')}</p>
        <p className={pStyle}>{t('start_6')}</p>
        <p className={pStyle}>{t('start_7')}</p>
      </div>
    </PageBase>
  );
};

export default Home;
