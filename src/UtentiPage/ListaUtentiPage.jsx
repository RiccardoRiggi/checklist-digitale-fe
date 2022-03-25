import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../_components/Layout';
import { userActions } from '../_actions';
import { alertActions } from '../_actions';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Grid, Item } from '@mui/material';




function ListaUtentiPage() {

  const users = useSelector(state => state.users);
  const user = useSelector(state => state.authentication.user);
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
    dispatch(alertActions.error(users.error));
  }, []);

  const columns = [
    { field: 'identificativo', headerName: 'Id', width: 100 },
    { field: 'nome', headerName: 'Column 2', width: 150 },
  ];

  return (
    <Layout errore={users.error} isCaricamento={users.loading}>

      <Grid container spacing={2} paddingTop={5}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          {!users.loading && users.error == null && (
            <DataGrid style={{ height: '80vh', width: '100%' }}
              rows={users.items}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={row => row.identificativo}
            />
          )}
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>




    </Layout>

  );
}
export { ListaUtentiPage };