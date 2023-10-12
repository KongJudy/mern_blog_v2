import { BiCopyright } from 'react-icons/bi';

const Footer = () => {
  return (
    <div className='bg-white w-full py-4 px-6 drop-shadow-md text-center font-bold'>
      <div className='flex justify-end gap-2'>
        <span>Connect</span>
        <BiCopyright className='mt-1' />
        <span>2023</span>
      </div>
    </div>
  );
};

export default Footer;
