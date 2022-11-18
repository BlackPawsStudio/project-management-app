interface LoaderProps {
  size: `w-${string} h-${string}`;
}

const Loader = ({ size }: LoaderProps) => {
  return (
    <div className={`${size} relative border rounded-full shadow-xxl`}>
      <span className="loader-circle animate-pulse-1 bg-[#98b9eb]" />
      <span className="loader-circle animate-pulse-2 bg-[#5883c2]" />
      <span className="loader-circle animate-pulse-3 bg-[#adc6ef]" />
      <span className="loader-circle animate-pulse-4 bg-[#fff]" />
    </div>
  );
};

export default Loader;
