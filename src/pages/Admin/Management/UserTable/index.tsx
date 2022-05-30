import { useLazyQuery } from "@apollo/client";
import { queryAllUser } from "graphql/query";
import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

interface Props {}

const headers = [
    { key: "1", name: "#" },
    { key: "2", name: "ID" },
    { key: "3", name: "Username" },
    { key: "4", name: "FullName" },
    { key: "5", name: "Email" },
    { key: "6", name: "" },
];

const UserTable = (props: Props) => {
    const [getAllUser] = useLazyQuery(queryAllUser);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const res = await getAllUser();
            const users = res.data.allUser.map((user: any) => {
                return {
                    id: user.id,
                    username: user.username,
                    fullName: user.fullName,
                    email: user.email,
                };
            });
            setData(users);
        })();
    }, []);

    const deleteItem = async () => {
        if (window.confirm("Delete Item?")) {
            console.log("delete");
        }
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {headers.map((item) => {
                            return <th key={item.key}>{item.name}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.fullName}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button
                                        className="d-none d-lg-block bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3 no-border"
                                        onClick={deleteItem}
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default React.memo(UserTable);
