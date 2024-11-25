'use client';

import Link from 'next/link';
import logoImg from '@public/logo-primary.svg';
import logoImgText from '@public/logo-primary-text.svg';
import Image from 'next/image';
import { Title, Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { PiAppleLogoFill, PiArrowLeftBold } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import OrSeparation from './or-separation';
import toast from 'react-hot-toast';

export default function AuthWrapperOne({
  children,
  title,
  bannerTitle,
  bannerDescription,
  description,
  pageImage,
  isSocialLoginActive = false,
  isSignIn = false,
  backgroundImage,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  bannerTitle?: string;
  bannerDescription?: string;
  pageImage?: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
  backgroundImage?: string;
}) {
  function handleSignIn() {
    toast.error(
      <Text>
        This is only demo purpose, click on the{' '}
        <Text as="b" className="font-semibold text-gray-900">
          Sign In
        </Text>{' '}
        button to login.
      </Text>
    );
  }
  return (
    <>
    <div 
        className="fixed inset-0 z-0"
        // style={{
        //   backgroundImage: `url(${backgroundImage})`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   backgroundRepeat: 'no-repeat'
        // }}
        style={{
          backgroundImage: `url('/images/BG.png')`,  // Direct reference to public folder
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <Link
        href={'/'}
        className="sticky start-0 top-0 z-20 flex items-center justify-center bg-blue p-3.5 text-sm font-medium text-white md:p-4 lg:hidden"
      >
        <PiArrowLeftBold />
        <Text className="ms-1 font-lexend">Back to home</Text>
      </Link>

      <div className="min-h-screen justify-between gap-x-8 px-4 py-8 pt-10 md:pt-12 lg:flex lg:p-6 xl:gap-x-10 xl:p-7 2xl:p-10 2xl:pt-10 [&>div]:min-h-[calc(100vh-80px)]">
        <div className="relative flex w-full items-center justify-end lg:w-5/12 2xl:pe-12">
          <div className=" w-full max-w-sm md:max-w-md lg:py-7 lg:pt-16 2xl:w-[400px] 2xl:max-w-none 2xl:pt-7">
            {isSocialLoginActive && (
              <>
                <div className="grid grid-cols-1 gap-4 pb-5 md:grid-cols-2 md:pb-6 xl:gap-5 xl:pb-7">
                  <Button
                    onClick={() =>
                      // it should be signIn('apple')
                      handleSignIn()
                    }
                    variant="outline"
                    className="h-11 w-full bg-white"
                  >
                    <PiAppleLogoFill className="me-2 h-4 w-4 shrink-0" />
                    <span className="truncate">Signin With Apple</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      // it should be signIn('google')
                      handleSignIn()
                    }
                    className="h-11 w-full bg-white"
                  >
                    <FcGoogle className="me-2 h-4 w-4 shrink-0" />
                    <span className="truncate">Signin With Google</span>
                  </Button>
                </div>
                <OrSeparation title="OR" className="mb-5 2xl:mb-7" isCenter />
              </>
            )}

            {children}
          </div>
        </div>
        <div className="hidden w-7/12 items-center justify-start rounded-[20px] bg-gray-50 px-6 lg:flex 2xl:px-8 dark:bg-gray-100/40">
          <div className="pb-8 text-center xl:pt-16 2xl:block 2xl:w-[1063px]">
            {/* {pageImage} */}
            <div className="relative mx-auto aspect-[4/3.37] w-[500px] h-[255px] xl:w-[620px] 2xl:w-[820px]">
              {/* <Image
                src={
                  'https://img.freepik.com/free-vector/gradient-purple-hexagonal-background_23-2148965956.jpg?w=2000'
                }
                alt="Sign Up Thumbnail"
                fill
                priority
                sizes="(max-width: 768px) 100vw"
                className="object-cover"
              /> */}
              <Image
                src="/images/logo.png"  // Update with your actual image name and extension
                alt="Sign Up Thumbnail"
                fill
                priority
                sizes="(max-width: 768px) 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
