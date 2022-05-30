import { useLazyQuery } from "@apollo/client";
import { queryAllProvider } from "graphql/query";
import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

interface Props {}

const headers = [
    { key: "1", name: "#" },
    { key: "2", name: "ID" },
    { key: "3", name: "Name" },
    { key: "4", name: "Address" },
];

const ProviderTable = (props: Props) => {
    const [getAllProvider] = useLazyQuery(queryAllProvider);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const res = await getAllProvider();
            const providers = res.data.allProvider.map((provider: any) => {
                return {
                    id: provider.id,
                    name: provider.name,
                    address: provider.address,
                };
            });
            setData(providers);
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
                                <td>{item.name}</td>
                                <td>{item.address}</td>
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

export default React.memo(ProviderTable);
