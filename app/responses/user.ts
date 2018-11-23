const userResponse = (user) => {
 const { id, email, name } = user;

 return { id, email, name };
};

export default userResponse;