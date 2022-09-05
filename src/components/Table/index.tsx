import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import store, { RootState } from '../../store/store';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGridPro,
    GridColumns,
    GridRowParams,
    MuiEvent,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
} from '@mui/x-data-grid-pro';
import TextField from '@mui/material/TextField';
import { deleteUserAction } from '../../store/slices/users/users.actions';


interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    return (
        <GridToolbarContainer sx={{
            mt: 2,
            ml: 2,
            gap: 1
        }}>
            <TextField id="search" placeholder='Search' sx={{
                backgroundColor: 'white', '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                    padding: "10px 10px"
                }
            }} />
            <TextField id="username" placeholder='User Name' sx={{
                backgroundColor: 'white', '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                    padding: "10px 10px"
                }
            }} />
        </GridToolbarContainer>
    );
}

export default function Table() {
    const selectedData = useSelector((state: RootState) => state.users);

    const columns: GridColumns = [
        { field: 'id', headerName: 'ID', width: 220 },
        {
            field: 'title',
            headerName: 'Title',
            width: 90,
            editable: true,
        },
        { field: 'firstName', headerName: 'First name', width: 130, editable: true },
        { field: 'lastName', headerName: 'Last name', width: 130, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    React.useEffect(() => {
        console.log({ data: selectedData.value })
        setRows(selectedData.value.data)
        setRowCountState(selectedData.value.total)
    }, [selectedData.value.data])

    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const [rowCountState, setRowCountState] = React.useState(0);

    const queryOptions = React.useMemo(
        () => ({
            page,
            pageSize,
        }),
        [page, pageSize],
    );

    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>,
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        store.dispatch(deleteUserAction(id))
        setRows(rows.filter((row: any) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row: any) => row.id === id);
        setRows(rows.filter((row: any) => row.id !== id));
    };

    // const processRowUpdate = (newRow: GridRowModel) => {
    //     const updatedRow = { ...newRow, isNew: false };
    //     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    //     return updatedRow;
    // };

    return (
        <div style={{ height: 500 }}>
            <DataGrid
                sx={{
                    backgroundColor: "white"
                }}
                rowCount={rowCountState}
                rows={rows}
                columns={columns}
                editMode="row"
                onRowClick={(e) => console.log("row clicked", e.row)}
                rowModesModel={rowModesModel}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                // processRowUpdate={processRowUpdate}
                components={{
                    Toolbar: EditToolbar,
                }}
                componentsProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                experimentalFeatures={{ newEditingApi: true }}
                pagination
                page={page}
                pageSize={pageSize}
                paginationMode="server"
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[25]}
            />
        </div>
    );
}
