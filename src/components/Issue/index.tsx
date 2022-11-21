import deleteIco from '/public/assets/component-images/deleteIcon.svg';
import lowest from '/public/assets/component-images/importance-icons/1.svg';
import low from '/public/assets/component-images/importance-icons/2.svg';
import middle from '/public/assets/component-images/importance-icons/3.svg';
import high from '/public/assets/component-images/importance-icons/4.svg';
import highest from '/public/assets/component-images/importance-icons/5.svg';
import Image from 'next/image';

import { IssueType } from '../../utils/types';

const Issue = ({ data }: { data: IssueType }) => {
  const { text, importance, estimation, theme } = JSON.parse(data.description);
  const isAdmin = true;

  const copyText = async () => await navigator.clipboard.writeText(data._id);

  return (
    <div className="button min-h-[130px] w-full cursor-pointer rounded-3xl bg-issueBg p-4 pb-2 shadow-xxl">
      <div className="mb-5 flex h-fit w-full items-center justify-between">
        <h6 className=" text-2xl">{data.title}</h6>
        {isAdmin && (
          <button>
            <Image src={deleteIco} alt="Delete button" width={20} />
          </button>
        )}
      </div>
      <div className="mb-2 rounded-xl bg-headerText px-2 text-white">{theme}</div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-6 w-6 text-center">
            <Image
              src={
                +importance === 1
                  ? lowest
                  : +importance === 2
                  ? low
                  : +importance === 3
                  ? middle
                  : +importance === 4
                  ? high
                  : highest
              }
              alt={`Task importance is ${importance}`}
            />
          </div>
          <div className="h-6 w-6 rounded-full bg-section text-center">{estimation}</div>
          <div className="h-6 w-6 rounded-full bg-section text-center">{`${data.userId}`[0]}</div>
        </div>
        <div className="cursor-pointer" title={'Copy id ' + data._id} onClick={copyText}>
          {'id: ' + data._id.substring(0, 6) + '...'}
        </div>
      </div>
    </div>
  );
};

export default Issue;
