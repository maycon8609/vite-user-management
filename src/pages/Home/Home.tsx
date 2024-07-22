import { useState } from "react";

import { Box, Button, Container, Typography } from "@mui/material";

import {
  Add as AddIcon,
  Edit as EditIcon,
  DeleteOutlined as DeleteIcon,
  Save as SaveIcon,
  Close as CancelIcon,
} from "@mui/icons-material";

import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from "@mui/x-data-grid";
import { Copyright } from "../../components/Copyright";

interface InitialRowsProps {
  id: number;
  name: string;
  email: string;
  isNew: boolean;
}

const initialRows: InitialRowsProps[] = [
  { id: 1, name: "John Doe", email: "john@example.com", isNew: false },
  { id: 2, name: "Jane Smith", email: "jane@example.com", isNew: false },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", isNew: false },
  { id: 4, name: "Bob Brown", email: "bob@example.com", isNew: false },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", isNew: false },
  { id: 6, name: "Diana Evans", email: "diana@example.com", isNew: false },
  { id: 7, name: "Edward Harris", email: "edward@example.com", isNew: false },
  { id: 8, name: "Fiona Garcia", email: "fiona@example.com", isNew: false },
  { id: 9, name: "George Martinez", email: "george@example.com", isNew: false },
  { id: 10, name: "Hannah Wilson", email: "hannah@example.com", isNew: false },
  { id: 11, name: "Diana Evans", email: "diana@example.com", isNew: false },
  { id: 12, name: "Edward Harris", email: "edward@example.com", isNew: false },
  { id: 13, name: "Fiona Garcia", email: "fiona@example.com", isNew: false },
  { id: 14, name: "George Martinez", email: "george@example.com", isNew: false },
  { id: 15, name: "Hannah Wilson", email: "hannah@example.com", isNew: false },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Math.random().toString(36).substring(2);
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export function Home() {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false } as InitialRowsProps;
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "email", headerName: "E-mail", width: 300, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: "primary.main" }}
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

  return (
    <Container
      component="main"
      style={{
        padding: 24,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          component="header"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="h1" variant="h5">
            Nome do usuario logado
          </Typography>

          <img
            srcSet="https://placehold.co/60?text=User&font=roboto"
            src="https://placehold.co/60?text=User&font=roboto"
            alt="Imagem de perfil do usuario"
            loading="lazy"
            width={60}
            height={60}
            style={{
              borderRadius: "50%",
            }}
          />
        </Box>

        <Box
          sx={{
            height: 450,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar as GridSlots["toolbar"],
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </Box>

        <Copyright />
      </Box>
    </Container>
  );
}
