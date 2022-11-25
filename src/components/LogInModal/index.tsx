import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

interface LogInProps {
  isLogin?: boolean;
}

const LogInModal = ({ isLogin }: LogInProps) => {
  const [isDefaultOpen, setIsDefaultOpen] = useState(false);

  const submit = () => {
    if (isLogin) {
      console.log('login action');
    } else {
      console.log('signin action');
    }
  };

  const modalOpener = isLogin ? <Button>LOG IN</Button> : <Button>SIGN UP</Button>;

  const modalWindow = (
    <div className="relative  z-10 h-[700px] w-[500px] overflow-hidden rounded-[26px] bg-section">
      <div className="bg-circle right-[-40%] top-[9.91px] z-10 h-[500px] w-[500px] " />
      <div className="absolute top-0 left-0 z-[11] h-full w-full px-[39px] pt-[92px]">
        <h2 className="m-auto h-[75px] text-4xl font-bold leading-[44px] text-titleText">
          {isLogin ? 'Log In' : 'Sign in'}
        </h2>
        <div className="flex h-[422px] w-[422px] flex-col justify-between rounded-[26px] bg-white px-[63px] pt-[92px] pb-[46px] shadow-xxlInner">
          <div>
            <h4 className="text-left text-[24px] font-bold leading-[29px] text-titleText">Username</h4>
            <Input size="w-[296px] h-[47px]" />
          </div>
          <div>
            <h4 className="text-left text-[24px] font-bold leading-[29px] text-titleText">Password</h4>
            <Input size="w-[296px] h-[47px]" type="password" />
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
    </div>
  );

  return (
    <Modal isDefaultOpen={isDefaultOpen} open={modalOpener}>
      {modalWindow}
    </Modal>
  );
};

export default LogInModal;
