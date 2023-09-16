# ✏ Custom Page

[https://next-auth.js.org/configuration/pages](https://next-auth.js.org/configuration/pages)

![cascasc.JPG](%E2%9C%8F%20Custom%20Page%2064d745e57fd84943baf7edb87c393c79/cascasc.jpg)

## 사용자 정의 페이지

---

(공식문서 예시)

사용자 정의 로그인 페이지를 추가하려면 다음 `pages`옵션을 사용할 수 있습니다.

```jsx
/pages/api/auth/[...nextauth].js

const authOptions = {
	pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
}
```

(프로젝트 적용 코드)

하지만 저는 signIn만 필요하기 때문에 나머지는 사용하지 않도록 하겠습니다.

```jsx
/src/app/api/auth/[...nextauth].ts

const authOptions: NextAuthOptions = {
	...
  pages: {
    signIn: "/auth",
  },
};
```

## **OAuth** Provider

---

사용 가능한 인증 공급자와 이에 사용할 URL을 얻으려면 signIn에 provider의 id를 넣으면 됩니다.

(공식문서 예시)

```jsx
/pages/auth/signin.tsx

import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? [] },
  }
}
```

(프로젝트 적용 코드)

저의 경우 getProviders()를 했을때 kakao와 google 2개의 provider가 불러와 지므로 Buttons의 데이터에 provider의 키를 저장해두고 map으로 버튼을 렌더링할때 Prop으로 전달해 주었습니다.

```jsx
/src/app/auth/Auth.data.tsx

export const Buttons = [
  {
    title: "구글계정으로 시작",
    icon: <BsGoogle className="w-22pxr h-22pxr" />,
    provider: "google",
  },
  {
    title: "카카오톡으로 시작",
    icon: <RiKakaoTalkFill className="w-28pxr h-28pxr" />,
    provider: "kakao",
  },
];
```

```jsx
/src/app/auth/page.tsx

...

export default async function AuthPage({
  searchParams: { callbackUrl },
}: Props) {
  const providers = await getProviders(); // kakao, google 두개의 provider를 불러옴

  return (
    <article className=" w-full z-10 flex-col-center text-white">
      {providers &&
        Buttons.map(({ title, icon, provider }, i) => (
          <AuthButton
            key={i}
            title={title}
            icon={icon}
            provider={providers[provider]}
            callbackUrl={callbackUrl ?? "/"}
          />
        ))}
    </article>
  );
}
```

```jsx
/src/components/ui/AuthButton.tsx
"use client";
...
export default function AuthButton({
...
}: Props) {
  return (
    <button
      onClick={() => signIn(provider.id, { callbackUrl })}
      className="flex-center mb-13pxr text-sm w-[75%] h-40pxr border border-gray-750 active:bg-gray-750/30"
    >
      <div className="flex items-center justify-between w-[65%] max-w-[220px]">
        {icon}
        <p className="px-[12%] ellipsis">{title}</p>
      </div>
    </button>
  );
}
```