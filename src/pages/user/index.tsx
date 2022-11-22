// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// import Loader from '../../../components/Loader';
import PageBase from '../../components/PageBase';
import BoardCard from '../../components/BoardCard';
import ColumnTitleField from '../../components/ColumnTitleField';
// import { useGetUserByIdQuery } from '../../../utils/hooks/reactQueries';

const tempUser = {
  name: 'John Smith',
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
  },
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
  },
];

const tempTasks = [
  {
    _id: '00001',
    title: 'Breakfast'
  },
  {
    _id: '00002',
    title: 'Dinner'
  },
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
      <PageBase title={tempUser.name.toUpperCase()} onSubmit={(str) => {}}>
        <h3 className="text-center text-[42px] font-bold text-primaryText my-[24px]">My boards</h3>
        <div className="w-full h-4/5">
          <div className="h-full min-w-min mx-8 flex gap-[20px] overflow-auto justify-around page-scrollbar">
            {tempBoards.map((board) => (
              <BoardCard key={board._id} boardData={board} tasks={tempTasks.length} columns={tempColumns.length}>
                {tempColumns.map((column) => (
                  <ColumnTitleField key={column._id}>{column.title}</ColumnTitleField>
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