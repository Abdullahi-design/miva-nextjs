"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AuthBtn = () => {

  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <section className="">
      <div className=''>
        {session?.user ? (
          <button type='button' onClick={signOut} className='outline_btn'>
            Sign Out
          </button>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default AuthBtn