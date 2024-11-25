import { Metadata } from 'next';
import PageHeader from '@/app/shared/page-header';
import { useRouter } from 'next/navigation';
import ProfileDetails from '@/app/shared/profile/profile-details';
import ProfileHeader from '@/app/shared/profile/profile-header';
import { CreateUserInput } from '@/utils/validators/create-user.schema';
import UserDetailsNav from '@/app/shared/users/userList/navigation';
// import NewUserForm from '@/app/shared/ecommerce/dashboard';

// SEO metadata
export const metadata: Metadata = {
  title: 'New Page | Isomorphic Furyroad',
};

const pageHeader = {
  title: 'User List',
  breadcrumb: [
    {
      href: '/',
      name: 'home',
    },
    {
      href: '/Users/all-users',
      name: 'user list',
    },
    {
      name: 'user info',
    },
  ],
};

interface UserInfoPageProps {
  searchParams: CreateUserInput;
}




export default function UserInfoPage({ searchParams }: any) {
  console.log("djsadhfklsahfjkdsafdsafdsfdssdsd");
  console.log("djsadhfklsahfjkdsafdsafdsfdssdsd");
  console.log("djsadhfklsahfjkdsafdsafdsfdssdsd");
  console.log("djsadhfklsahfjkdsafdsafdsfdssdsd");
  console.log("djsadhfklsahfjkdsafdsafdsfdssdsd");
  console.log("djsadhfklsahfjkdsafdsafdsfdssdsd");
  console.log("djsadhfklsahfjkdsafdsafdsfdssdsd");
  console.log("User details include: " + searchParams.status);
  console.log("User details include: " + searchParams.email);
  console.log("User details are: " + searchParams);

  if (!searchParams) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <PageHeader title={`${searchParams.role}'s Details`} breadcrumb={pageHeader.breadcrumb} />

      {/* <div>
        <li>asddsadadsfjfhkdlfkds</li>
        <li>{searchParams.email}</li>
        <li>{searchParams.first_name}</li>
        <li>{searchParams.middle_name}</li>
        <li>{searchParams.last_name}</li>
        <li>{searchParams.phone_number}</li>
        <li>{searchParams.role}</li>
        <li>{searchParams.first_name}</li>
        <li>{searchParams.first_name}</li>
      </div> */}
      
      <ProfileHeader userDetails={searchParams}/>

      <UserDetailsNav role={searchParams.role}/>
      <ProfileDetails />
    </>
  );
}