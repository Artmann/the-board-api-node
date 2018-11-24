const boardResponse = (board) => {
    const { id, columns, name, swimLanes, userId } = board;

    return { 
        id,
        columns,
        swimLanes,
        user: userId
    };
};

export default boardResponse;