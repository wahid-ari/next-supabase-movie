import Navbar from './Navbar';
import HeadSeo from '@components/layout/HeadSeo';
import BackToTop from './BackToTop';
import Footer from './Footer';

export default function Layout({ children, title, description, className }) {
  return (
    <>
      <HeadSeo title={title} description={description} />
      <div className='relative dark:bg-neutral-900'>
        <Navbar className='bg-white/50 backdrop-blur-md backdrop-filter dark:bg-neutral-900/30' />
        <div className={`mx-auto min-h-screen w-full max-w-7xl p-4 pb-10 ${className ? className : ''}`}>
          {children}
        </div>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
