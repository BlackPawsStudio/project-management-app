import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Button from '../Button';
import LogInModal from '../LogInModal';

interface BurgerMenuProps {
  isLoggedIn?: boolean;
  isOpened: boolean;
  signOut: () => void;
  deleteAccount: () => void;
}

const BurgerMenu = ({ isLoggedIn, isOpened, signOut, deleteAccount }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [pageName, setPageName] = useState('');

  const router = useRouter();

  useEffect(() => {
    setUserId(localStorage.getItem('nextBoardUserId') || '');
  }, []);

  useEffect(() => {
    setIsOpen(isOpened);
  }, [isOpened]);

  useEffect(() => {
    if (router.pathname === '/') setPageName('main');
    if (router.pathname.includes('user')) setPageName('user');
    if (router.pathname.includes('board')) setPageName('board');
  }, [router]);

  const transitionClasses = {
    enter: 'transition ease-out duration-500',
    enterFrom: '-translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'transition ease-in duration-500',
    leaveFrom: 'translate-x-full',
    leaveTo: '-translate-x-full'
  };

  const copyText = async () => await navigator.clipboard.writeText(userId || '');
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child as={Fragment} {...transitionClasses}>
            <div className="fixed inset-0 overflow-y-auto" onClick={() => setIsOpen(false)}>
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel>
                  {
                    <aside className="fixed top-0 left-0 h-screen w-screen bg-section">
                      <div className="bg-circle -z-1 top-[-20vh] left-[-30vh] h-[75vh] w-[75vh]" />
                      <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-between p-[100px_48px]">
                        <div className="w-full">
                          {!isLoggedIn && (
                            <>
                              {pageName && <h2 className="text-lg">You are on {pageName} page</h2>}
                              <h2 className="text-2xl font-bold">Welcome {'username'}!</h2>
                              {userId && (
                                <h3 className="cursor-pointer text-3xl" title={'Copy id ' + userId} onClick={copyText}>
                                  {'id: ' + userId.substring(0, 6) + '...'}
                                </h3>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex w-full flex-col gap-[15px] text-[20px] text-titleText">
                          <Link className="button w-full border-b-2 border-titleText" href="/">
                            Go to main page
                          </Link>
                          {isLoggedIn ? (
                            <>
                              {router.pathname.includes('user') ? (
                                <div className="button w-full border-b-2 border-titleText" onClick={deleteAccount}>
                                  Delete user
                                </div>
                              ) : (
                                <Link className="button w-full border-b-2 border-titleText" href="/user">
                                  Go to user page
                                </Link>
                              )}
                              <div className="button" onClick={signOut}>
                                Logout
                              </div>
                            </>
                          ) : (
                            <>
                              <LogInModal isLogin isMobile />
                              <LogInModal isMobile />
                            </>
                          )}
                        </div>
                        <Button onClick={() => setIsOpen(false)}>Close</Button>
                      </div>
                    </aside>
                  }
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>

      <div
        className="button absolute left-[22px] flex h-[30px] w-[40px] flex-col justify-between lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <span className="h-1 w-full bg-headerText" />
        <span className="h-1 w-full bg-headerText" />
        <span className="h-1 w-full bg-headerText" />
      </div>
    </>
  );
};

export default BurgerMenu;
