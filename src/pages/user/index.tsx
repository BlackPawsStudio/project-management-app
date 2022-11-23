// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// import Loader from '../../../components/Loader';
import PageBase from '../../components/PageBase';
import BoardCard from '../../components/BoardCard';
import ColumnTitleField from '../../components/ColumnTitleField';
// import { useGetUserByIdQuery } from '../../../utils/hooks/reactQueries';

const tempUser = {
  name: 'John Smith'
};

const tempBoards = [
  {
    _id: '001',
    title: 'Daily Routine',
    owner: 'John Smith',
    users: ['Jane Smith', 'Harry Smith']
  },
  {
    _id: '001',
    title: 'Daily Routine',
    owner: 'John Smith',
    users: ['Jane Smith', 'Harry Smith']
  },
  {
    _id: '001',
    title: 'Daily Routine',
    owner: 'John Smith',
    users: ['Jane Smith', 'Harry Smith']
  },
  {
    _id: '001',
    title: 'Daily Routine',
    owner: 'John Smith',
    users: ['Jane Smith', 'Harry Smith']
  }
];

const tempColumns = [
  {
    _id: '0001',
    title: 'To do'
  },
  {
    _id: '0002',
    title: 'In progress'
  },
  {
    _id: '0003',
    title: 'Done'
  },
  {
    _id: '0004',
    title: 'Foo'
  },
  {
    _id: '0005',
    title: 'Bar'
  }
];

const tempTasks = [
  {
    _id: '00001',
    title: 'Breakfast'
  },
  {
    _id: '00002',
    title: 'Dinner'
  }
];

const UserPage = () => {
  // const router = useRouter();

  // const { data, isLoading, isError } = useGetUserByIdQuery(
  //   typeof router.query.id === 'string' ? router.query.id : undefined
  // );

  // useEffect(() => {
  //   if (isError) {
  //     router.push('/404');
  //   }
  // }, [isError]);

  return (
    // <>
    //   {isLoading || isError ? (
    //     <div className="flex h-full w-full items-center justify-center">
    //       <Loader size={'w-[25vw] h-[25vw]'} />
    //     </div>
    //   ) : (
    //     <PageBase title={data.name}>
    //       <>{data.users}</>
    //     </PageBase>
    //   )}
    // </>
    <>
      <PageBase
        title={tempUser.name.toUpperCase()}
        className={'mx-auto w-[95vw] overflow-hidden'}
        onSubmit={(str) => {}}
      >
        <h3 className="my-[24px] text-center text-[42px] font-bold text-primaryText">My boards</h3>
        <div className="w-[calc(100% - 100px)] mx-[50px] h-4/5 overflow-auto">
          <div className="flex h-full w-fit items-center gap-[40px] py-[22px]">
            {tempBoards.map((board, id) => (
              <BoardCard key={id} boardData={board} tasks={tempTasks.length} columns={tempColumns.length}>
                {tempColumns.map((column, id) => (
                  <ColumnTitleField key={id}>{column.title}</ColumnTitleField>
                ))}
              </BoardCard>
            ))}
          </div>
        </div>
      </PageBase>
    </>
  );
};

export default UserPage;
