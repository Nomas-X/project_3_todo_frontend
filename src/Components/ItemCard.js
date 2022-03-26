import React from 'react'
import { Card, CardHeader, CardContent, IconButton, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DeleteOutlined } from '@mui/icons-material';

const useStyles = makeStyles ({
	avatar: {
		backgroundColor: (item) => {
			return `${item.color} !important`
		}
	}
})

export default function ItemCard({ item, handleDelete, setIsPending, isPending }) {
	const classes = useStyles(item);
	
  return (
	<div>
		<Card elevation={1}>
			
			{!isPending && <CardHeader
				avatar={
					<Avatar className={classes.avatar}>
						{item.category[0].toUpperCase()}
					</Avatar>
				}
				action={
					<IconButton onClick={() => handleDelete(item._id)}>
						<DeleteOutlined />
					</IconButton>
				}
				title={item.title}
				subheader={item.category}
			/>}
			{isPending && <CardHeader
				avatar={
					<Avatar className={classes.avatar}>
						{item.category[0].toUpperCase()}
					</Avatar>
				}
				action={
					<IconButton onClick={() => handleDelete(item._id)} disabled>
						<DeleteOutlined />
					</IconButton>
				}
				title={item.title}
				subheader={item.category}
			/>}
			<CardContent>
				<Typography variant="body2" color="textSecondary">
					{item.details}
				</Typography>
			</CardContent>
		</Card>
		
	</div>
  )
}
