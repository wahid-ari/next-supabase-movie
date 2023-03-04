import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ActiveLink({ children, className, activeClassName, ...props }) {
  const { asPath } = useRouter();
  const childClassName = className || '';

  // pages/index.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const classNames =
    asPath === props.href || asPath === props.as ? `${childClassName} ${activeClassName}`.trim() : className;

  return (
    <Link {...props} className={classNames}>
      {children}
    </Link>
  );
}
