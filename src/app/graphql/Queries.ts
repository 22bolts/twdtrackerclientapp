import { gql } from "@apollo/client"

export const GET_ALL_USERS = gql`
query{
  getAllUsers{
    id
    email
    first_name
    middle_name
    last_name
    phone_number
    usertag
    status
    avatar
    role
  }
}
`