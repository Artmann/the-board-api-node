const userResponse = (user, boards = []) => {
    const { id, email, name } = user;

    return { 
        id,
        boards: boards.map(b => b.id),
        email,
        name
    };
};

export default userResponse;