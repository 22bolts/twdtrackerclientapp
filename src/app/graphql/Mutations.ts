import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!,
    $password: String!,
    $first_name: String!,
    $middle_name: String,
    $last_name: String!,
    $phone_number: String,
    $role: String!,
    $usertag: String!,
    $status: String!,
    $avatar: String,
    $companyName: String,
    $address: String,
    $department: String,
    $position: String,
    $managerID: ID,
    $skills: [String!],
    $portfolio_Link: String,
    $availabilityStatus: String,
    $hourly_Rate: Float,
  ) {
    createUser(
      email: $email,
      password: $password,
      first_name: $first_name,
      middle_name: $middle_name,
      last_name: $last_name,
      phone_number: $phone_number,
      role: $role,
      usertag: $usertag,
      status: $status,
      avatar: $avatar,
      companyName: $companyName,
      address: $address,
      department: $department,
      position: $position,
      managerID: $managerID,
      skills: $skills,
      portfolio_Link: $portfolio_Link,
      availabilityStatus: $availabilityStatus,
      hourly_Rate: $hourly_Rate,
    ) {
      first_name
      middle_name
      email
    }
  }
`;


// export const CREATE_USER = gql`
//   mutation createUser($email: String!, $password: String!, $phone_number: String, $role: String!, $first_name: String!,
//     $middle_name: String, $last_name: String!, $companyName: String!, $address: String,
//   ){
//     createUser (email: "jsfjldsajfdsakd", password: "ssfdsdfsfdsdf", first_name: "sdfjsdf",
//     middle_name:"dasfjlsfd", last_name: "hdsddkal", phone_number: "0908090", role: "client",
//     companyName: "Sfsadfsad", address: "34 dskgjdsk") {
//       first_name
//       middle_name
//       email
//     }
//   }
// `;

// export const CREATE_USER = gql`
//   mutation createUser(
//     $email: String!,
//     $password: String!,
//     $phone_number: String,
//     $role: String!,
//     $first_name: String!,
//     $middle_name: String,
//     $last_name: String!,
//     $department: String!,
//     $position: String,
//     $managerID: ID,
//     $skills: String,
//     $portfolio_Link: String,
//     $availabilityStatus: String,
//     $hourly_Rate: Float,
//     $companyName: String,
//     $address: String,
//   ) {
//     createUser(
//       email: $email,
//       password: $password,
//       phone_number: $phone_number,
//       role: $role,
//       first_name: $first_name,
//       middle_name: $middle_name,
//       last_name: $last_name,
//       department: $department,
//       position: $position,
//       managerID: $managerID,
//       skills: $skills,
//       portfolio_Link: $portfolio_Link,
//       availabilityStatus: $availabilityStatus,
//       hourly_Rate: $hourly_Rate,
//       companyName: $companyName,
//       address: $address,
//     ) {
//       id
//       email
//       password
//       phone_number
//       role
//       first_name
//       middle_name
//       last_name
//       department
//       position
//       managerID
//       skills
//       portfolio_Link
//       availabilityStatus
//       hourly_Rate
//       companyName
//       address
//     }
//   }
// `;
