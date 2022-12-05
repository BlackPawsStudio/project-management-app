import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseJwt } from '../../utils';
import { useLogInMutation, useSignUpMutation } from '../../utils/hooks/reactPostQueries';
import Button from '../Button';
import Input from '../Input';
import Loader from '../Loader';
import Modal from '../Modal';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';
import { useStore } from '../../store/store';
import AuthErrorModal from '../AuthErrorModal';

interface LogInProps {
  isLogin?: boolean;
  isMobile?: boolean;
  onError: (value: boolean) => void;
}

const LogInModal = ({ isLogin, isMobile, onError }: LogInProps) => {
  const router = useRouter();
  const setIsLogin=useStore((state)=>state.setIsLogin)

  const { t } = useTranslation();

  const [isDefaultOpen, setIsDefaultOpen] = useState(false);

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [isLoginError, setIsLoginError] = useState(false);
  const [isSignUpError, setIsSignUpError] = useState(false);

  const logInMutation = useLogInMutation();
  const { data, isLoading } = logInMutation;

  const signUpMutation = useSignUpMutation();
  const { data: signUpData, isLoading: signUpIsLoading } = signUpMutation;

  const authErrorMessage = isSignUpError ? t('signup_error') : isLoginError ? t('login_error') : '';

  useEffect(() => {
    if (!isLoginError) {
      setIsDefaultOpen(false);
      if (data) {
        setIsDefaultOpen(true);
        setIsLoginError(false);

        const userData = parseJwt(data.token);
        localStorage.setItem('nextBoardUserToken', data.token);
        localStorage.setItem('nextBoardUserId', userData.id);
        setIsLogin(true)

        router.push('/user');
      }
    }
  }, [logInMutation.data]);

  useEffect(() => {
    const func = async () => {
      if (!isSignUpError) {
        if (signUpData) {
          const logInData = await logInMutation.mutateAsync({ login, password });

          setIsDefaultOpen(true);
          setIsSignUpError(false);
          const userData = parseJwt(logInData.token);
          localStorage.setItem('nextBoardUserToken', logInData.token);
          localStorage.setItem('nextBoardUserId', userData.id);

          router.push('/user');
        }
      }
    };
    func();
  }, [signUpMutation.data]);

  const submit = async () => {
    if (isLogin) {
      await logInMutation.mutateAsync({ login, password });
      setTimeout(() => {
        if (!logInMutation.data) {
          setIsLoginError(true);
        }
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
      setIsLogin(true)

      router.push('/user');
      if (!signUpMutation.data) {
        setIsSignUpError(true);
      }
    }
  };

  useEffect(() => {
    if (!signUpIsLoading && signUpData) {
      setIsDefaultOpen(true);
      setTimeout(() => {
        setIsDefaultOpen(false);
        localStorage.setItem('nextBoardUserToken', data?.token);
        router.push('/user');
      });
    }
  }, [signUpData, signUpIsLoading]);

  const modalOpener = isMobile ? (
    <div className={`button w-full pb-[7px] ${isLogin && 'border-b-2 border-titleText'}`}>
      {isLogin ? t('log_in') : t('sign_up')}
    </div>
  ) : isLogin ? (
    <Button>{t('log_in')}</Button>
  ) : (
    <Button>{t('sign_up')}</Button>
  );

  const modalWindow = (
    <div className="absolute top-0 left-0 z-10 h-full w-full overflow-hidden bg-section lg:relative lg:h-[650px] lg:w-[500px] lg:rounded-[26px]">
      <div className="bg-circle right-[-60%] top-[-5%] z-10 h-[500px] w-[500px] lg:right-[-30%] " />
      {isLoading ? (
        <div className="absolute top-0 left-0 z-[11] flex h-full w-full items-center justify-center lg:h-full lg:w-full">
          <Loader size="w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] mx-auto" />
        </div>
      ) : (
        <div className="absolute top-0 left-0 z-[11] h-full w-full px-[20px] pt-[30px] lg:px-[39px]">
          <h2 className="m-auto h-[75px] text-4xl font-bold leading-[44px] text-titleText">
            {isLogin ? 'Log In' : 'Sign up'}
          </h2>
          <div className="flex h-[80%] w-[100%] flex-col justify-around rounded-[26px] bg-white px-[20px] py-[25px] shadow-xxlInner lg:px-[63px]">
            {!isLogin && (
              <div>
                <h4 className="mb-2 text-left text-2xl font-bold leading-[29px] text-titleText">{t('name')}</h4>
                <Input size="w-full lg:w-[296px] h-[47px]" onChange={setName} />
              </div>
            )}
            <div>
              <h4 className="mb-2 text-left text-2xl font-bold leading-[29px] text-titleText">{t('username')}</h4>
              <Input size="w-full lg:w-[296px] h-[47px]" onChange={setLogin} />
            </div>
            <div>
              <h4 className="mb-2 text-left text-2xl font-bold leading-[29px] text-titleText">{t('password')}</h4>
              <Input size="w-full lg:w-[296px] h-[47px]" type="password" onChange={setPassword} />
            </div>
            <div className="flex justify-between">
              <Button
                cancel={true}
                onClick={() => {
                  setIsDefaultOpen(true);
                  setTimeout(() => setIsDefaultOpen(false));
                }}
              >
                {t('cancel')}
              </Button>
              <Button submit={true} type="submit" onClick={submit}>
                {t('confirm')}
              </Button>
              <AuthErrorModal
                text={authErrorMessage}
                onLogInError={() => setIsLoginError(false)}
                onSignUpError={() => setIsSignUpError(false)}
                isError={isLoginError || isSignUpError}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Modal isMobile={isMobile} hasToClose={isDefaultOpen} open={modalOpener}>
      {modalWindow}
    </Modal>
  );
};

export default LogInModal;
