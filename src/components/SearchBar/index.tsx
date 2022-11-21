import glassIcon from '/public/assets/component-images/magnif-glass.svg';
import Image from 'next/image';
import { useState } from 'react';

interface SearchBarProps {
  text?: string;
  onSubmit: (search: string) => void;
}

const SearchBar = ({ text, onSubmit }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="absolute right-[45px] top-[17px] flex items-center gap-3 text-[24px] text-headerText">
      <label className="font-bold">{text}</label>
      <div className="relative flex h-[45px] w-[220px] items-center">
        <input
          type="text"
          className="h-full w-full rounded-lg bg-inputBackground px-2.5 pr-14 shadow-xxlInner focus:outline-none"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Image
          src={glassIcon}
          alt=""
          className="absolute right-3 cursor-pointer hover:scale-[110%] active:scale-95"
          onClick={() => onSubmit(searchValue)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
