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
    <div className="lg:absolute lg:right-[45px] lg:top-[17px] flex items-center gap-3 text-2xl text-headerText">
      <label className="font-bold">{text}</label>
      <div className="relative flex h-[45px] w-[220px] items-center">
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
