import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseJwt } from '../../utils';
import { useLogInMutation } from '../../utils/hooks/reactPostQueries';
import Button from '../Button';
import Input from '../Input';
import Loader from '../Loader';
import Modal from '../Modal';

interface LogInProps {
  isLogin?: boolean;
}

const LogInModal = ({ isLogin }: LogInProps) => {
  const router = useRouter();
  const [isDefaultOpen, setIsDefaultOpen] = useState(false);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useLogInMutation();
  const { data, isLoading, isError } = mutation;

  const submit = async () => {
    if (isLogin) {
      const data = await mutation.mutateAsync({ login, password });
      console.log(parseJwt(data.token));
    } else {
      console.log('signin action');
    }
  };

  useEffect(() => {
    if (isError) {
      router.push('/404');
    }
    if (!isLoading && data?.token) {
      setIsDefaultOpen(true);
      setTimeout(() => {
        setIsDefaultOpen(false);
        localStorage.setItem('userToken', data?.token);
        console.log(localStorage.getItem('userToken'));
        router.push('/user');
      });
    }
  }, [isError, isLoading, data]);

  const modalOpener = isLogin ? <Button>LOG IN</Button> : <Button>SIGN UP</Button>;

  const modalWindow = (
    <div className="relative  z-10 h-[700px] w-[500px] overflow-hidden rounded-[26px] bg-section">
      <div className="bg-circle right-[-40%] top-[9.91px] z-10 h-[500px] w-[500px] " />
      {isLoading ? (
        <div className="absolute top-0 left-0 z-[11] flex h-full w-full items-center justify-center">
          <Loader size="w-[400px] h-[400px] mx-auto" />
        </div>
      ) : (
        <div className="absolute top-0 left-0 z-[11] h-full w-full px-[39px] pt-[92px]">
          <h2 className="m-auto h-[75px] text-4xl font-bold leading-[44px] text-titleText">
            {isLogin ? 'Log In' : 'Sign up'}
          </h2>
          <div className="flex h-[422px] w-[422px] flex-col justify-between rounded-[26px] bg-white px-[63px] pt-[92px] pb-[46px] shadow-xxlInner">
            <div>
              <h4 className="text-left text-2xl font-bold leading-[29px] text-titleText">Username</h4>
              <Input size="w-[296px] h-[47px]" onChange={setLogin} />
            </div>
            <div>
              <h4 className="text-left text-2xl font-bold leading-[29px] text-titleText">Password</h4>
              <Input size="w-[296px] h-[47px]" type="password" onChange={setPassword} />
            </div>
            <div className="flex justify-between">
              <Button
                className="h-[47px] w-[130px]"
                cancel={true}
                onClick={() => {
                  setIsDefaultOpen(true);
                  setTimeout(() => setIsDefaultOpen(false));
                }}
              >
                Cancel
              </Button>
              <Button className="h-[47px] w-[130px]" submit={true} type="submit" onClick={submit}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Modal isDefaultOpen={isDefaultOpen} open={modalOpener}>
      {modalWindow}
    </Modal>
  );
};

export default LogInModal;
