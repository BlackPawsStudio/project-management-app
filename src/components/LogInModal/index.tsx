import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseJwt } from '../../utils';
import { useLogInMutation, useSignUpMutation } from '../../utils/hooks/reactPostQueries';
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

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const logInMutation = useLogInMutation();
  const { data, isLoading, isError } = logInMutation;

  const signUpMutation = useSignUpMutation();
  const { data: signUpData, isLoading: signUpIsLoading, isError: SignUpIsError } = signUpMutation;

  const submit = async () => {
    if (isLogin) {
      const data = await logInMutation.mutateAsync({ login, password });
      setIsDefaultOpen(true);
      setTimeout(() => {
        setIsDefaultOpen(false);

        const userData = parseJwt(data.token);
        localStorage.setItem('nextBoardUserToken', data.token);
        localStorage.setItem('nextBoardUserId', userData.id);

        router.push('/user');
      });
      
    } else {
      await signUpMutation.mutateAsync({
        name,
        login,
        password
      });
      const logInData = await logInMutation.mutateAsync({ login, password });
      
      const userData = parseJwt(logInData.token);
      localStorage.setItem('nextBoardUserToken', logInData.token);
      localStorage.setItem('nextBoardUserId', userData.id);

      router.push('/user');
    }
  };

  useEffect(() => {
    if (isError) {
      router.push('/404');
    }
  }, [isError]);

  useEffect(() => {
    if (SignUpIsError) {
      router.push('/404');
    }
    if (!signUpIsLoading && signUpData) {
      setIsDefaultOpen(true);
      setTimeout(() => {
        setIsDefaultOpen(false);
        localStorage.setItem('nextBoardUserToken', data?.token);
        router.push('/user');
      });
    }
  }, [signUpData, signUpIsLoading, SignUpIsError]);

  const modalOpener = isLogin ? <Button>LOG IN</Button> : <Button>SIGN UP</Button>;

  const modalWindow = (
    <div className="relative z-10 h-[650px] w-[500px] overflow-hidden rounded-[26px] bg-section">
      <div className="bg-circle right-[-40%] top-[9.91px] z-10 h-[500px] w-[500px] " />
      {isLoading ? (
        <div className="absolute top-0 left-0 z-[11] flex h-full w-full items-center justify-center">
          <Loader size="w-[400px] h-[400px] mx-auto" />
        </div>
      ) : (
        <div className="absolute top-0 left-0 z-[11] h-full w-full px-[39px] pt-[30px]">
          <h2 className="m-auto h-[75px] text-4xl font-bold leading-[44px] text-titleText">
            {isLogin ? 'Log In' : 'Sign up'}
          </h2>
          <div className="flex h-[80%] w-[422px] flex-col justify-around rounded-[26px] bg-white px-[63px] py-[25px] shadow-xxlInner">
            {!isLogin && (
              <div>
                <h4 className="mb-2 text-left text-2xl font-bold leading-[29px] text-titleText">Name</h4>
                <Input size="w-[296px] h-[47px]" onChange={setName} />
              </div>
            )}
            <div>
              <h4 className="mb-2 text-left text-2xl font-bold leading-[29px] text-titleText">Username</h4>
              <Input size="w-[296px] h-[47px]" onChange={setLogin} />
            </div>
            <div>
              <h4 className="mb-2 text-left text-2xl font-bold leading-[29px] text-titleText">Password</h4>
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
