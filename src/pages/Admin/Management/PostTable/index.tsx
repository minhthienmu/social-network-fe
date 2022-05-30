import { useLazyQuery } from "@apollo/client";
import { queryAllPost } from "graphql/query";
import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { convertDateToDateTime } from "utils/utils";

interface Props {}

const headers = [
    { key: "1", name: "#" },
    { key: "2", name: "ID" },
    { key: "3", name: "Date" },
    { key: "4", name: "User" },
    { key: "5", name: "Provider" },
    { key: "6", name: "Service" },
    { key: "7", name: "Description" },
    { key: "8", name: "Rate" },
    { key: "9", name: "" },
];

const PostTable = (props: Props) => {
    const [getAllPost] = useLazyQuery(queryAllPost);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const res = await getAllPost({
                variables: {
                    request: {
                        last: 0,
                        currentUserId: "",
                    },
                },
            });
            const posts = res.data.allPost.map((item: any) => {
                return {
                    id: item.id,
                    userFullName: item.userFullName,
                    provider: item.providerName,
                    service: item.serviceName,
                    date: convertDateToDateTime(item.date),
                    rate: item.rate,
                    description: item.description,
                };
            });
            setData(posts);
        })();
    }, []);

    const deleteItem = async () => {
        if (window.confirm("Delete Item?")) {
            console.log("delete");
        }
    };

    return (
        <Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {headers.map((item: any) => {
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
                                <td>{item.date}</td>
                                <td>{item.userFullName}</td>
                                <td>{item.provider}</td>
                                <td>{item.service}</td>
                                <td>{item.description}</td>
                                <td>{item.rate}</td>
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
        </Fragment>
    );
};

export default React.memo(PostTable);
