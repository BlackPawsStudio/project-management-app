import { useRouter } from 'next/router';
import Button from '../components/Button';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex h-full w-full items-center justify-center text-headerText">
      <div className="text-center">
        <h2 className="text-8xl font-bold italic">Oops!</h2>
        <h4 className="mt-1 text-4xl font-bold italic">404 - Page not found</h4>
        <p className="mx-auto mt-6 w-[430px] text-2xl italic">
          The page you are looking for might been removed, renamed or temporarily unavailable
        </p>
        <Button className="mt-6 rounded-full px-6" onClick={() => router.push('/')}>
          GO TO MAIN PAGE
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
