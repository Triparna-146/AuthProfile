import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      fullName
      age
      bio
      gender
      city
      country
      phoneNumber
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

