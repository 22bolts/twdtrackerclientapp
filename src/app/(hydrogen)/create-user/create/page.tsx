'use client'; // Marks the component as a client component

import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useMutation } from "@apollo/client";
import { CREATE_USER } from '@/app/graphql/Mutations'; 
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

const NewUserForm: React.FC = () => {
  const [formData, setFormData] = useState(defaultCreateUserInput); // Use defaultCreateUserInput from your schema
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
    
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // const client = new ApolloClient({
  //   uri: 'http://localhost:3001/graphql',
  //   cache: new InMemoryCache(),
  // });
  
  const [createUserMutation, { error: mutationError }] = useMutation(CREATE_USER);

  const onSubmit = async (formData: CreateUserInput) => {
    console.log(formData);
    try {
      const response = await createUserMutation({
        variables: {
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          middle_name: formData.middle_name,
          last_name: formData.last_name,
          phone_number: formData.phone_number,
          role: formData.role,
          companyName: formData.companyName,
          address: formData.address
        }
      });
      console.log('Mutation Response:', response);
      
      toast.success('User created successfully!');
    } catch (error) {
      console.error('Mutation Error:', error);
      
      toast.error('Error creating user.');
      // Handle errors, e.g., show user feedback
    }
  };
  
  
  

  if (mutationError) {
    console.error('Mutation error:', mutationError.message);
    // Optionally handle specific errors based on error.message or error.graphQLErrors
  }

  const handleRoleChange = (value: string | null) => {
      if (value) {
        setSelectedRole(value);
      }
  };

    return (
      
    // <ApolloProvider client={client}>
      <Form<CreateUserInput>
      validationSchema={createUserSchema}
      onSubmit={onSubmit} // Pass the onSubmit function here
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: defaultCreateUserInput,
      }}
      >
        {({ register, control, setValue, getValues, formState: { errors } }) => (
          <>
            <FormGroup
              title="New user"
              description="Write down details of the new user to create one through the client app"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />
            {/* Name input fields */}
            <FormGroup
              title="Name"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            >
              <Input
                placeholder="First Name"
                {...register('first_name')}
                error={errors.first_name?.message}
                className="flex-grow"
              />
              <Input
                placeholder="Middle Name"
                {...register('middle_name')}
                error={errors.last_name?.message}
                className="flex-grow"
              />
              <Input
                placeholder="Last Name"
                {...register('last_name')}
                error={errors.last_name?.message}
                className="flex-grow"
              />
            </FormGroup>
            
            {/* Add space between form */}
            <div className="mt-7"></div>
            
            <FormGroup
              title="Password"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            >
              <Input
                placeholder="Input password"
                {...register('password')}
                error={errors.first_name?.message}
                className="flex-grow"
              />
              <Input
                placeholder="Confirm password"
                onVolumeChange={(value: any) => {
                    setConfirmPassword(value)
                }}
                error={errors.last_name?.message}
                className="flex-grow"
              />
            </FormGroup>
            
            {/* Add space between form */}
            <div className="mt-7"></div>

            {/* Email input field */}
            <FormGroup
              title="Email Address"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            >
              <Input
                className="col-span-full"
                prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
                type="email"
                placeholder="georgia.young@example.com"
                {...register('email')}
                error={errors.email?.message}
              />
            </FormGroup>
            
            {/* Add space between form */}
            <div className="mt-7"></div>
            
            {/* Phone number input fields */}
            <FormGroup
              title="Phone number"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            >
              <Input
                placeholder="Phone Number"
                {...register('phone_number')}
                error={errors.first_name?.message}
                className="flex-grow"
              />
            </FormGroup>
            
            {/* Add space between form */}
            <div className="mt-7"></div>

            <FormGroup
            title="Role"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          >
            <Select
              options={[
                { value: 'client', label: 'Client' },
                { value: 'employee', label: 'Employee' },
                { value: 'freelancer', label: 'Freelancer' },
              ]}
              placeholder="Select Role"
              onChange={(selectedOption: any) => {
                const selectedValue = selectedOption ? selectedOption.value : '';
                setValue('role', selectedValue);
                handleRoleChange(selectedValue);
              }}
              value={selectedRole}
              className="col-span-full"
            />
          </FormGroup>

          {/* Render respective fields based on selected role */}
          {selectedRole === 'client' && (
            <>
              {/* Client-specific fields */}
                <FormGroup
                    title="Company Name"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                    <Input
                    placeholder="Company Name"
                    {...register('companyName')}
                    error={errors.companyName?.message}
                    className="flex-grow"
                    />
                </FormGroup>
                
                {/* Add space between form */}
                <div className="mt-7"></div>

                {/* Employee-specific fields */}
                <FormGroup
                    title="Address"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                    <Input
                    placeholder="Address"
                    {...register('address')}
                    className="flex-grow"
                    />
                </FormGroup>
              {/* Add more client-specific fields here */}
            </>
          )}

          {selectedRole === 'employee' && (
            <>
            
                {/* Phone number input fields */}
                <FormGroup
                title="Department"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                <Input
                    placeholder="Department"
                    {...register('department')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                />
                </FormGroup>
                
                {/* Add space between form */}
                <div className="mt-7"></div>

                {/* Employee-specific fields */}
                <FormGroup
                    title="Position"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                    <Input
                    placeholder="Position"
                    {...register('position')}
                    error={errors.position?.message}
                    className="flex-grow"
                    />
                </FormGroup>
                
                {/* Add space between form */}
                <div className="mt-7"></div>

                {/* Employee-specific fields */}
                <FormGroup
                    title="Manager ID"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                    <Input
                    placeholder="Manager ID"
                    {...register('managerID')}
                    error={errors.position?.message}
                    className="flex-grow"
                    />
                </FormGroup>
                {/* Add more employee-specific fields here */}
            </>
          )}

          {selectedRole === 'freelancer' && (
            <>
                {/* Freelancer-specific fields */}
                <FormGroup
                    title="Skills"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                    <Input
                    placeholder="Skills"
                    {...register('skills')}
                    error={errors.skills?.message}
                    className="flex-grow"
                    />
                </FormGroup>
                
                {/* Add space between form */}
                <div className="mt-7"></div>

                {/* Employee-specific fields */}
                <FormGroup
                    title="Portfolio Link"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                    <Input
                    placeholder="Portfolio Link"
                    {...register('portfolio_Link')}
                    error={errors.position?.message}
                    className="flex-grow"
                    />
                </FormGroup>
                
                {/* Add space between form */}
                <div className="mt-7"></div>

                {/* Employee-specific fields */}
                <FormGroup
                    title="Hourly Rate"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                    <Input
                    placeholder="Hourly Rate"
                    {...register('hourly_Rate')}
                    error={errors.position?.message}
                    className="flex-grow"
                    />
                </FormGroup>
                {/* Add more freelancer-specific fields here */}
            </>
          )}
            {/* Other input fields */}
            {/* Your Photo */}
            {/* Role */}
            {/* Country */}
            {/* Timezone */}
            {/* Bio */}
            {/* Portfolio Projects */}
            {/* Form Footer */}
            
            {/* Add space between form */}
            <div className="mt-7"></div>
            
            <FormFooter
              altBtnText="Cancel"
              submitBtnText="Create"
            />
          </>
        )}
      </Form>
    // </ApolloProvider>
    );
  };
  
  export default NewUserForm;
