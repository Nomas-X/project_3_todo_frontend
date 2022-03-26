import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar } from '@mui/material';
import { AddCircleOutlineOutlined, DashboardRounded } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { format } from 'date-fns';

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
	return {
		page: {
			background: '#f9f9f9',
			width: '100%',
			padding: theme.spacing(3)
		},
		root: {
			display: 'flex'
		},
		drawer: {
			width: drawerWidth
		},
		drawerPaper: {
			width: drawerWidth
		},
		active: {
			background: '#f4f4f4 !important'
		},
		title: {
			padding: theme.spacing(2)
		},
		appbar: {
			width: `calc(100% - ${drawerWidth}px) !important`
		},
		toolbar: theme.mixins.toolbar,
		date: {
			flexGrow: 1
		},
		avatar: {
			marginLeft: theme.spacing(2)
		}
	}
})

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardRounded color="secondary" />, 
      path: '/dashboard' 
    },
    { 
      text: 'Add Todo', 
      icon: <AddCircleOutlineOutlined color="secondary" />, 
      path: '/create' 
    },
	{ 
		text: 'Sign-out', 
		icon: <LogoutRoundedIcon color="secondary" />, 
		path: '/signout' 
	},
	// Add logoiut & clear all functions
  ];

  return (
    <div className={classes.root}>
      {/* app bar */}
	  <AppBar 
	  className={classes.appbar} 
	  elevation={0}
	  >
		  <Toolbar>
			  <Typography className={classes.date}>
				  Date: { format(new Date(), 'do MMMM Y') }
			  </Typography>
			  <Typography>
				  User logged in
			  </Typography>
		  </Toolbar>
	  </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Nomas Todo
          </Typography>
        </div>

        {/* links/list section */}
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
		  <div className={classes.toolbar}></div>
        { children }
      </div>
    </div>
  )
}