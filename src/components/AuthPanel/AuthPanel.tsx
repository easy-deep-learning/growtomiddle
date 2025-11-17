'use client';

import { Button } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import classes from './AuthPanel.module.css';

export const AuthPanel = () => {
  const { data: session, status } = useSession();

  return (
    <div className={classes.component}>
      {status === 'unauthenticated' && (
        <Button type="primary" onClick={() => signIn()}>
          Войти
        </Button>
      )}
      {status === 'loading' && <div className={classes.loader}></div>}
      {status === 'authenticated' && (
        <>
          <p className={classes.title}>Привет, {session?.user?.name}</p>
          <div className={classes.avatarAndMenu}>
            <Link href="/profile">
              <img
                className={classes.avatar}
                src={session?.user?.image as string}
                alt={session?.user?.name as string}
              />
            </Link>
            <div className={classes.menu}>
              <Link href="/profile" className={classes.linkToProfile}>
                Профиль
              </Link>
              <Button
                className={classes.logout}
                onClick={() => {
                  confirm('Вы уверены, что хотите выйти?') && signOut();
                }}
              >
                Выйти
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
