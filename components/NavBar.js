import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';

function MyLink({ href, children }) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(href === router.asPath);
  }, [href, router.asPath]);

  const className = cx(
    'border-b-4 py-3 text-center text-slate-900 text-lg select-none',
    {
      'border-b-purple-500': isActive,
      'border-b-transparent': !isActive,
    }
  );

  return isActive ? (
    <span className={className}>{children}</span>
  ) : (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

function NavBar() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 grid grid-cols-2 bg-white px-6 text-white shadow-md">
      <MyLink href="/">留言牆</MyLink>
      <MyLink href="/publish">留下祝福</MyLink>
    </div>
  );
}

export default NavBar;
