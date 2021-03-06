/* eslint-disable */
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { useSortBy, useTable } from 'react-table';
import { Button, TableSortLabel, Typography } from '@mui/material';

export default function DenseTable() {
    const [users, setUsers] = React.useState([]);

    const fetchUsers = async () => {
        // https://jsonplaceholder.typicode.com/posts
        let data = await axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then((res) => res.data);
        setUsers(data);
        console.log(data);
    };

    const data = React.useMemo(() => users, [users]);
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Title',
                accessor: 'title',
                Cell: (row) => {
                    return <Typography variant="caption">{row.value}</Typography>;
                },
            },
            {
                Header: 'Body',
                accessor: 'body',
            },
        ],
        []
    );

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: 'actions',
                Header: 'Actions',
                Cell: ({ row }) => (
                    <Button
                        startIcon={<EditIcon />}
                        onClick={() => alert(row.values.id)}
                    >
                        Edit
                    </Button>
                ),
            },
        ]);
    };

    const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
            },
            tableHooks,
            useSortBy
        );

    React.useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                    {...getTableProps()}
                >
                    <TableHead>
                        {headerGroups.map((headerGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <TableCell
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                        sx={{
                                            padding: '0.5rem',
                                            borderBottom: '1px solid #eaeaea',
                                        }}
                                    >
                                        <TableSortLabel
                                            hideSortIcon={
                                                column.id === 'actions'
                                            }
                                            active={column.isSorted}
                                            direction={
                                                column.isSortedDesc
                                                    ? 'desc'
                                                    : 'asc'
                                            }
                                        >
                                            {column.render('Header')}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell
                                                {...cell.getCellProps()}
                                                sx={{
                                                    padding: '0.5rem',
                                                }}
                                            >
                                                {cell.render('Cell')}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
