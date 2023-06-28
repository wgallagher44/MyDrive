import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { TextField } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { DataGrid } from '@mui/x-data-grid';
import "./Drive.css"

export default function Drive() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 4, col1: 'Hello', col2: 'World' },
    { id: 5, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 6, col1: 'MUI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 4, col1: 'Hello', col2: 'World' },
    { id: 5, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 6, col1: 'MUI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 4, col1: 'Hello', col2: 'World' },
    { id: 5, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 6, col1: 'MUI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 4, col1: 'Hello', col2: 'World' },
    { id: 5, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 6, col1: 'MUI', col2: 'is Amazing' },
  ];
  
  const columns = [
    { field: 'col1', headerName: 'First Name'},
    { field: 'col2', headerName: 'Last Name'},
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
        <div>
 <AppBar position="static">
        <Toolbar id = "toolbar">
            <div>
                <TextField id = "search" label = "Search" variant="filled" color="success"  ></TextField>
        <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
            </div>
            
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>View Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
         
          
        </Toolbar>
      </AppBar>
      <DataGrid rows={rows} columns={columns} checkboxSelection disableColumnMenu = "true" hideFooter = "true"/>
        </div>
     
   
  );
}