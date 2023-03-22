import { Space, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_USER } from "../../utils/api";
import { headers } from "../../utils/headers";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];
const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const handleGetUsers = async () => {
    setIsLoading(true);
    try {
      const { data: res } = await axios.get(`${BASE_URL_USER}`, {
        headers,
      });
      setUsers(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  // delete
  const handleRemoveUser = async (userId) => {
    try {
      const { data: res } = await axios.delete(`${BASE_URL_USER}/${userId}`, {
        headers,
      });
      console.log(res);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      throw new Error(error);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    // <Table
    //   columns={columns}
    //   dataSource={users.map((user) => (
    //     <tr key={user._id}>
    //       <td>{user.username}</td>
    //       <td>{user.email}</td>
    //       <td>{user.isAdmin.toString()}</td>
    //       <td>
    //         <Link to={`/user/${user._id}`} style={{ marginRight: "1rem" }}>
    //           <button>Update</button>
    //         </Link>
    //       </td>
    //     </tr>
    //   ))}
    // />
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin.toString()}</td>
            <td>
              <Link to={`/user/${user._id}`} style={{ marginRight: "1rem" }}>
                <button>Update</button>
              </Link>
              <button onClick={() => handleRemoveUser(user._id)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default UserList;
