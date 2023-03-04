import Navbar from './Navbar';
import HeadSeo from '@components/layout/HeadSeo';

export default function Layout({ children, title, description, className }) {
  return (
    <>
      <HeadSeo title={title} description={description} />
      <div className='relative dark:bg-neutral-900'>
        <Navbar />
        <div className={`mx-auto min-h-screen w-full max-w-7xl p-4 ${className ? className : ''}`}>{children}</div>
      </div>
    </>
  );
}
