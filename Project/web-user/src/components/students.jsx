import { useEffect, useState } from "react";

const getAllStudentsUrl = 'http://localhost:3300/api/v1/student/all';
const deleteStudentByIdUrl = 'http://localhost:3300/api/v1/student';

const Students = ({updateTime, dataChanged, studentToEdit}) => {
    const [students, setStudents] = useState([]);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) ?? {});

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
                setStudents(jsonData);
            })
            .catch(error => console.log(error))
        }
        catch (error) {
                console.error(error)
            }
        }
        getData(getAllStudentsUrl);
    }, [updateTime]);

    const deleteHandler = (studentId) => {
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
        deleteData(`${deleteStudentByIdUrl}/${studentId}`);
    }

    return(
        <>
        <h6>Students</h6>
            <table border="1">
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {
                        students.map((student)=> {
                            return(
                                <tr>
                                    <th>{student._id}</th>
                                    <th>{student.name}</th>
                                    <th>{student.email}</th>
                                    <th>{student.course}</th>
                                    <th>
                                        <button onClick={() => studentToEdit(student._id)}>Edit</button>
                                        <button onClick={() => deleteHandler(student._id)}>Delete</button>
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

export default Students;