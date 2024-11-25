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

const ListUsers: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);

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
  
  const organizeUsersDetails = () => {
    
  }

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

  return (
    <div className="@container">
      <UsersTableV2
        data={usersTableData}
        className="@xs:col-span-full"
      />

      
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
