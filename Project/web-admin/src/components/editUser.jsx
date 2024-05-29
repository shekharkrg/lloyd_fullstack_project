import { memo, useEffect, useState } from "react";

const baseUserUrl = 'http://localhost:3300/api/v1/user';

const EditUser = ({userId, dataChanged}) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('adminUserData')) ?? {});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const getData = async (url) => {
            try {
            const result = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": userData.token
                }
            });
            result.json()
            .then(jsonData => {
                setFirstName(jsonData.firstName);
                setLastName(jsonData.lastName);
                setRole(jsonData.role);
            })
            .catch((error) => console.log(error));
        }
        catch (error) {
            console.error(error)
        }
        }

        const getUserByIdURL = `${baseUserUrl}/${userId}`;
        getData(getUserByIdURL);
    }, [userId]);

    const updateHandler = () => {
        const updateData = async (url, data) => {
            try {
                const result = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": userData.token
                     }
                });
                result.json()
                .then(jsonData => dataChanged())
                .catch(error => console.log(error));
            }
            catch (error) {
                console.error(error)
            }
        }

        const payload = {
            firstName: firstName,
            lastName: lastName,
            role: role
        }
        const editUserByIdURL = `${baseUserUrl}/${userId}`;
        updateData(editUserByIdURL, payload)
    }

    return(
        <>
        <h6>Update User</h6>
            <table>
                <tbody>
                    <tr>
                        <td>Enter First Name</td>
                        <td><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Enter Last Name</td>
                        <td><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Enter Role</td>
                        <td><input type="text" value={role} onChange={(e) => setRole(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button onClick={updateHandler}>Update</button></td>
                    </tr>
                </tbody>
            </table>
            <hr/>
        </>
    );
}

export default memo(EditUser);