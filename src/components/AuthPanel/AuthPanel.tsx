'use client'

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import classes from './AuthPanel.module.css'

export const AuthPanel = () => {
  const { data: session, status } = useSession()

  return (
    <div className={classes.component}>
      {status === 'unauthenticated' && (
        <button onClick={() => signIn()}>
          Войти
        </button>
      )}
      {status === 'loading' && (
        <div className={classes.loader}></div>
      )}
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
              <Link href="/profile"
                    className={classes.linkToProfile}
              >
                Профиль
              </Link>
              <button
                className={classes.logout}
                onClick={() => {
                  confirm('Вы уверены, что хотите выйти?') && signOut()
                }}
              >
                Выйти
              </button>
            </div>
          </div>

        </>
      )}
    </div>
  )
}
