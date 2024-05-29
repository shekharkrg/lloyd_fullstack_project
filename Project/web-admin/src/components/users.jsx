import { useEffect, useState } from "react";

const getAllUsersUrl = 'http://localhost:3300/api/v1/user/all';
const deleteUserByIdUrl = 'http://localhost:3300/api/v1/user';

const Users = ({updateTime, dataChanged, userToEdit}) => {
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('adminUserData')) ?? {});

    useEffect(() => {
        const getData = async (url) => {
            try {
            const result = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": userData.token
                }
            });
            await result.json()
            .then(jsonData => {
                console.log(jsonData);
                setUsers(jsonData);
            })
            .catch(error => console.log(error))
        }
        catch (error) {
                console.error(error)
            }
        }
        getData(getAllUsersUrl);
    }, [updateTime]);

    const deleteHandler = (userId) => {
        const deleteData = async (url) => {
            try {
            const result = await fetch(url, {
                method: 'DELETE',
                headers: {
                    "Authorization": userData.token
                }
            });
            result.json().then(jsonData => dataChanged())
            .catch(error => console.log(error));
        }
        catch (error) {
            console.error(error)
        }
        }
        deleteData(`${deleteUserByIdUrl}/${userId}`);
    }

    return(
        <>
        <h6>Users</h6>
            <table border="1">
                <thead>
                    <th>Id</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Role</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {
                        users.map((user)=> {
                            return(
                                <tr>
                                    <th>{user.id}</th>
                                    <th>{user.firstName}</th>
                                    <th>{user.lastName}</th>
                                    <th>{user.role}</th>
                                    <th>
                                        <button onClick={() => userToEdit(user.id)}>Edit</button>
                                        <button onClick={() => deleteHandler(user.id)}>Delete</button>
                                    </th>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <hr/>
        </>
    );
}

export default Users;