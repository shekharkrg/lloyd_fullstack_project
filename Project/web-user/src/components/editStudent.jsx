import { memo, useEffect, useState } from "react";

const baseStudentUrl = 'http://localhost:3300/api/v1/student';

const EditStudent = ({studentId, dataChanged}) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) ?? {});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');

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
                setName(jsonData.name);
                setEmail(jsonData.email);
                setCourse(jsonData.course);
            })
            .catch((error) => console.log(error));
        }
        catch (error) {
            console.error(error)
        }
        }

        const getStudentByIdURL = `${baseStudentUrl}/${studentId}`;
        getData(getStudentByIdURL);
    }, [studentId]);

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
            name: name,
            email: email,
            course: course
        }
        const editStudentByIdURL = `${baseStudentUrl}/${studentId}`;
        updateData(editStudentByIdURL, payload)
    }

    return(
        <>
        <h6>Update Student</h6>
            <table>
                <tbody>
                    <tr>
                        <td>Enter Name</td>
                        <td><input type="text" value={name} onChange={(e) => setName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Enter Email</td>
                        <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Enter Course</td>
                        <td><input type="text" value={course} onChange={(e) => setCourse(e.target.value)}/></td>
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

export default memo(EditStudent);