import { useEffect, useRef, useState } from 'react';

import { useGetColumnIssuesQuery } from '../../utils/hooks/reactGetQueries';
import { ColumnType } from '../../utils/types';
import Issue from '../Issue';
import tick from '/public/assets/component-images/tick.svg';
import cross from '/public/assets/component-images/cross.svg';
import Image from 'next/image';
import autoAnimate from '@formkit/auto-animate';

const Column = ({ propData }: { propData: ColumnType }) => {
  const { data, isLoading, isError } = useGetColumnIssuesQuery(propData.boardId, propData._id);

  const [isChanging, setIsChanging] = useState(false);
  const [title, setTitle] = useState(propData.title);

  const titleInputRef = useRef<HTMLInputElement | null>(null);

  const titleParent = useRef(null);

  useEffect(() => {
    titleParent.current && autoAnimate(titleParent.current);
  }, [titleParent]);

  const changeTitle = () => {
    if (titleInputRef.current) {
      setTitle(titleInputRef.current.value);
      setIsChanging(false);
      //  send put request
    }
  };

  return (
    <div className="flex h-full min-w-[300px] flex-col gap-1 rounded-3xl bg-boardCard py-3 shadow-xxlInner">
      <div ref={titleParent}>
        {isChanging ? (
          <div className="flex h-8 w-full items-center justify-between px-3 text-2xl font-bold">
            <input
              ref={titleInputRef}
              defaultValue={title}
              className="h-full w-[150px] rounded-lg bg-inputBackground px-2.5 shadow-xxlInner focus:outline-none"
            />
            <div className="flex gap-2">
              <Image onClick={changeTitle} src={tick} alt="" className="button" />
              <Image onClick={() => setIsChanging(false)} src={cross} alt="" className="button" />
            </div>
          </div>
        ) : (
          <h5
            className="mx-3 h-8 w-full cursor-pointer text-2xl font-bold text-primaryText"
            onClick={() => setIsChanging(true)}
          >
            {title}
          </h5>
        )}
      </div>
      <div className="flex min-h-[92%] w-full flex-col gap-3 overflow-auto px-3 pt-1">
        {!isLoading && !isError && data.map((el, id) => <Issue column={propData} data={el} key={id} />)}
      </div>
    </div>
  );
};

export default Column;
