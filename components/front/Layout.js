import Navbar from './Navbar';
import HeadSeo from '@components/layout/HeadSeo';

export default function Layout({ children, title, description, className }) {

  return (
    <>
      <HeadSeo title={title} description={description} />
      <div className='dark:bg-neutral-900'>
      <Navbar />
        <div className={`p-4 max-w-7xl mx-auto min-h-screen w-full ${className ? className : ''}`}>
          {children}
        </div>
      </div>
    </>
  );
}
