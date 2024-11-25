'use client'; // Marks the component as a client component

import React, { useState } from 'react';
// import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { ApolloClient, InMemoryCache, ApolloProvider, useMutation } from "@apollo/client";
import { CREATE_USER } from '@/app/graphql/Mutations'; 
import axios from 'axios';

import { SubmitHandler, Controller } from 'react-hook-form';
import { PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { nanoid } from 'nanoid';
import { Select } from '@/components/ui/select';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@/components/form-footer';
import { PersonalInfoFormTypes, defaultValues, personalInfoFormSchema } from '@/utils/validators/personal-info.schema';
import toast from 'react-hot-toast';
import { CreateUserInput, createUserSchema, defaultCreateUserInput } from '@/utils/validators/create-user.schema';
import AvatarUpload from '@/app/shared/users/create/AvatarUpload';
// import AvatarUpload from '@/components/ui/file-upload/avatar-upload';

const NewUserForm: React.FC = () => {
  const [formData, setFormData] = useState(defaultCreateUserInput); // Use defaultCreateUserInput from your schema
  const [usertag, setUsertag] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const [avatar, setAvatar] = useState<string | null>(null);

  
  const [avatarLink, setAvatarLink] = useState<string | null>(null);



  const [confirmPassword, setConfirmPassword] = useState('');

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // const client = new ApolloClient({
  //   uri: 'http://localhost:3001/graphql',
  //   cache: new InMemoryCache(),
  // });
  
  const [createUserMutation, { error: mutationError }] = useMutation(CREATE_USER);

  const onSubmit = async (formData: CreateUserInput) => {
    console.log(formData.avatar);
    const data = {
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      middle_name: formData.middle_name,
      last_name: formData.last_name,
      usertag : usertag,
      status: formData.status,
      avatar: avatarLink,
      phone_number: formData.phone_number,
      role: selectedRole,
      companyName: formData.companyName,
      address: formData.address,
      position: formData.position,
      department: formData.department,
      managerID: 11,
      skills: selectedSkills,
      portfolio_Link: formData.portfolio_Link,
      hourly_Rate: formData.hourly_Rate,
      availabilityStatus: formData.availabilityStatus,
    }
    console.log(data);
    try {
      const response = await createUserMutation({
        variables: {
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          middle_name: formData.middle_name,
          last_name: formData.last_name,
          usertag : usertag,
          status: formData.status,
          avatar: avatarLink,
          phone_number: formData.phone_number,
          role: selectedRole,
          companyName: formData.companyName,
          address: formData.address,
          position: formData.position,
          department: formData.department,
          managerID: 11,
          skills: selectedSkills,
          portfolio_Link: formData.portfolio_Link,
          hourly_Rate: formData.hourly_Rate,
          availabilityStatus: formData.availabilityStatus,
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

  const generateUsertag = () => {
    const firstName = formData.first_name || '';
    const lastName = formData.last_name || '';
    const uniqueId = nanoid(6); // Generate a unique ID with 6 characters
    const mixedName = mixNames(firstName, lastName);
    const generatedUsertag = `${mixedName}${uniqueId}`;
    setUsertag(generatedUsertag);
    // setValue('usertag', generatedUsertag);

    return generateUsertag;
  };

  const mixNames = (firstName: string, lastName: string) => {
    // Mix the names in a unique way (e.g., first letter of first name + last name)
    return `${firstName.charAt(0)}${lastName}`;
  };

  



  // Mock function to fetch suggestions based on input
  const fetchSuggestions = (inputValue: string) => {
    // This is a mock example, replace with actual API call to fetch suggestions
    const mockSuggestions = [
      'JavaScript',
      'Python',
      'React',
      'Node.js',
      'TypeScript',
      'HTML',
      'CSS',
    ];

    // Filter suggestions based on input value
    const filteredSuggestions = mockSuggestions.filter((skill) =>
      skill.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filteredSuggestions;
  };

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
    const newSuggestions = fetchSuggestions(inputValue);
    setSuggestions(newSuggestions);
  };

  const handleSkillChange = (newValue: any) => {
    const newSkills = newValue.map((option: any) => option.value);
    setSelectedSkills(newSkills);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === ',' && inputValue.trim() !== '') {
      event.preventDefault();
      const newSkill = inputValue.trim();
      setSelectedSkills([...selectedSkills, newSkill]);
      setInputValue('');
    }
  };

  const logAvartarValue = () => {
    console.log(avatar);
    console.log("The avatar link is: ", avatarLink);
  }

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
            {/* <FormGroup
              title="Your Photo"
              description="This will be displayed on your profile."
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            >
              <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                <AvatarUpload
                  name="avatar"
                  setValue={setValue}
                  getValues={getValues}
                  error={errors?.avatar?.message as string}
                />
              </div>
            </FormGroup> */}

            
            <FormGroup
              title="Your Photo"
              description="This will be displayed on your profile."
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            >
              
              <AvatarUpload
                setValue={setAvatar}
                setAvatarLink={setAvatarLink}
                // error={errors.avatar ? errors.avatar.message : ''}
                error={''}
              />
            </FormGroup>
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
                {/* Add space between form */}
                <div className="mt-7"></div>

                {/* freelancer-specific fields */}
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
                
                <FormGroup
                    title="Skills"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <CreatableSelect
                    isMulti
                    options={suggestions.map((skill) => ({ value: skill, label: skill }))}
                    value={selectedSkills.map((skill) => ({ value: skill, label: skill }))}
                    onChange={handleSkillChange}
                    onInputChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    inputValue={inputValue}
                    isClearable={false}
                    placeholder="Type skills and press comma to add"
                  />
                </FormGroup>
                
                {/* Add space between form */}
                <div className="mt-7"></div>

                {/* freelancer-specific fields */}
                <FormGroup
                  title="Hourly Rate"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    type="number" // Change type to number for numerical input
                    placeholder='12'
                    // {...register('hourly_Rate')} // Register the hourly_Rate field
                    onChange={(value) => {
                      setValue('hourly_Rate', parseFloat(value.target.value));
                    }}
                    error={errors.hourly_Rate?.message}
                    className="flex-grow"
                  />
                  {errors.hourly_Rate && (
                    <span className="text-red-500 text-sm">{errors.hourly_Rate?.message}</span>
                  )}
                </FormGroup>
                {/* Add more freelancer-specific fields here */}
            </>
          )}
          
          <FormGroup
              title="Usertag"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          >
            <Input
              placeholder="@myTag9548"
              value={usertag}
              onChange={(e) => {
                setValue('role', e.target.value);
                setUsertag(e.target.value);
              }}
              className="flex-grow"
            />
            <Button onClick={() => {setValue = generateUsertag}} style={{ width: '200px' }}>
              Generate
            </Button>
          </FormGroup>

          
          <FormGroup
              title="check debuglink"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          >
            <Button onClick={() => logAvartarValue()}>
              Log avartar link
            </Button>
          </FormGroup>
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
