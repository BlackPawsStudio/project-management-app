import glassIcon from '/public/assets/component-images/magnif-glass.svg';
import Image from 'next/image';
import { useState } from 'react';
import Input from '../Input';

interface SearchBarProps {
  text?: string;
  onSubmit: (search: string) => void;
}

const SearchBar = ({ text, onSubmit }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="flex items-center justify-center gap-3 px-[22px] text-lg text-headerText lg:absolute lg:right-[45px] lg:top-[17px] lg:px-0 lg:text-2xl">
      <label className="font-bold">{text}</label>
      <div className="relative flex h-[40px] w-[220px] items-center lg:h-[45px]">
        <Input onChange={setSearchValue} size="w-full h-full" />
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
