import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCreateColumnMutation } from '../../utils/hooks/reactPostQueries';
import { ColumnType } from '../../utils/types';
import Column from '../Column';
import Loader from '../Loader';
import crossAdd from '/public/assets/component-images/crossAdd.svg';

interface BoardPageProps {
  data: ColumnType[];
  isColumnsLoading: boolean;
  columnsRefetch: () => void;
}

const BoardPageComponent = ({ data, isColumnsLoading, columnsRefetch }: BoardPageProps) => {
  console.log(data);

  const addColumn = useCreateColumnMutation();
  const router = useRouter();

  const createColumn = async () => {
    await addColumn.mutateAsync({ id: router.query.id, BoardData: { title: 'new column', order: 0 } });
    columnsRefetch();
  };

  return (
    <>
      {isColumnsLoading ? (
        <div className="flex h-full max-w-full items-center justify-center">
          <Loader size={'w-[15vw] h-[15vw]'} />
        </div>
      ) : data.length > 0 ? (
        <div className="w-[calc(100% - 100px)] mx-[50px] h-full overflow-auto">
          <div className="flex h-full w-fit items-center gap-[40px] py-[22px]">
            {data.map((el) => (
              <Column columnsRefetch={columnsRefetch} propData={el} key={el._id} />
            ))}
            <button
              className="flex h-full min-w-[300px] items-center justify-center rounded-3xl bg-boardCard shadow-xxlInner"
              onClick={createColumn}
            >
              <Image src={crossAdd} alt="add button" width={75} className="button" />
            </button>
          </div>
        </div>
      ) : (
        <div className=" w-[calc(100% - 100px)] mx-[50px] flex h-full">
          <button
            className="flex h-full min-w-[300px] items-center justify-center rounded-3xl bg-boardCard shadow-xxlInner"
            onClick={createColumn}
          >
            <Image src={crossAdd} alt="add button" width={75} className="button" />
          </button>
          <p className="flex h-full w-full items-center justify-center text-[36px] font-bold">
            No columns in this board
          </p>
        </div>
      )}
    </>
  );
};

export default BoardPageComponent;
