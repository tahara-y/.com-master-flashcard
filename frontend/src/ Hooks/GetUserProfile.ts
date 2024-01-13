type GetUserProfileType = {
  userName:string;
};

const GetUserProfile = async(token:string):Promise<GetUserProfileType> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profile/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  });
  const data = await response.json()
  return{
    userName:data.username,
  };
};

export default GetUserProfile;
