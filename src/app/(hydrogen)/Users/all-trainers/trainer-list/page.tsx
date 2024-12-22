'use client'; // Marks the component as a client component

import React, { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from '@/app/graphql/Queries';
import axios from 'axios';

import { SubmitHandler, Controller } from 'react-hook-form';
import { PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@/components/form-footer';
import { PersonalInfoFormTypes, defaultValues, personalInfoFormSchema } from '@/utils/validators/personal-info.schema';
import toast from 'react-hot-toast';
import { CreateUserInput, createUserSchema, defaultCreateUserInput } from '@/utils/validators/create-user.schema';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import LoggedInDevices from '@/app/shared/account-settings/logged-in-devices/table';
import { loggedInDeviceData } from '@/data/logged-in-device';
// import AllUsers from '@/app/shared/users/userList/allUsers';
import AllUsers from '@/app/shared/users/userList/all-users';
import UsersTable from '@/app/shared/users/userList/user-table/table';

import dummyUserData from './dummyUserData';
import UsersTableV2 from '@/app/shared/account-settings/Users-table/table';
import { usersTableData } from '@/data/users-table-data';

// import UsersTable from '@/app/shared/roles-permissions/users-table';

// Define interfaces for the data structure
interface User {
  id: string;
  full_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  status?: string;
  teams?: string[];
  purchased?: number;
  completed?: number;
}

interface TransformedUser {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  email: string;
  purchased: number;
  completed: number;
  status: string;
  teams: string[];
}

const organizeUsersDetails = (users: any[]): TransformedUser[] => {
  return users.map((user) => ({
    id: user.id.toString(),
    user: {
      name: user.user?.full_name || "Unknown",
      email: user.user?.email || "No Email Provided",
      avatar: user.user?.avatar || 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-07.webp',
    },
    email: user.user?.email || "No Email Available",
    purchased: user.user?.purchased || 0,
    completed: user.user?.completed || 0,
    status: user.status || 'Offline',
    teams: user.teams || ['Operations'],
  }));
};

const ListUsers: React.FC = () => {
  // const { data, loading, error } = useQuery(GET_ALL_USERS);
  // const [users, setUsers] = useState<any[]>([]);
  const [users, setUsers] = useState<TransformedUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (data) {
  //     // Handle data here
  //     console.log(data.getAllUsers);
  //   }
  // }, [data]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  const handleDeleteItem = (id: string) => {
    // Implement delete logic here
    console.log(`Deleting user with ID ${id}`);
  };

  // const organizedData = data.getAllUsers.map((userData: any) => ({
  //   id: userData.id,
  //   user: {
  //     name: `${userData.first_name} ${userData.middle_name} ${userData.last_name}`,
  //     usertag: userData.usertag,
  //     avatar: userData.avatar? userData.avatar: "", // Add avatar URL if available
  //   },
  //   role: userData.role,
  //   email: userData.email, // Duplicate email for consistency with the original structure
  //   status: userData.status, // Set a default status or retrieve it from userData if available
  //   first_name: userData.first_name,
  //   middle_name: userData.middle_name,
  //   last_name: userData.last_name,
  //   usertag: userData.usertag,
  //   teams: [], // Set teams array or retrieve from userData if available
  //   // data
  // }));
  
  // console.log(organizedData);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("JJJJJJJJJJJJJJJJJJJ");
        const response = await axios.get('http://193.46.198.115:443/api/users/role/trainers');
        console.log("Users:", response.data);
        const transformedUsers = organizeUsersDetails(response.data.data);
        console.log("KKKKKKKKKKKKKKK");
        setUsers(transformedUsers);
        console.log("Dummy Users:", usersTableData);
        console.log("Transformed Users:", transformedUsers);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="@container">
      {/* <UsersTableV2
        data={users}
        className="@xs:col-span-full"
      /> */}

    {users.length > 0 ? (
      <UsersTableV2 data={users} className="@xs:col-span-full" />
      // <div>Users available.</div>
    ) : (
      <div>No users available.</div>
    )}

      {/* <UsersTable
        data={loggedInDeviceData}
        // className="@xs:col-span-full"
      /> */}

      {/* <UsersTable
        usersData={organizedData}
      /> */}
      
      {/* <h1>User Details</h1> */}
      {/* <AllUsers user={user} onDeleteItem={handleDeleteItem} /> */}

      {/* <h1>User List</h1> */}
      {/* Render your user data here */}
      {/* {userList.map((user: any) => (
        <div key={user.id}>
          <AllUsers user={user} onDeleteItem={handleDeleteItem} />
        </div>
      ))} */}

      {/* <h1>User List</h1> */}
      {/* Render your user data here */}
      {/* {data.getAllUsers.map((user: any) => (
        <div key={user.id}>
          <AllUsers user={user} onDeleteItem={handleDeleteItem} />
        </div>
      ))} */}

      {/* <div>
        {dummyUserData.map((user) => (
          <div key={user.id}>
            <AllUsers user={user} onDeleteItem={handleDeleteItem} />
          </div>
        ))}
      </div> */}
    </div>
  );
  };
  
  export default ListUsers;
