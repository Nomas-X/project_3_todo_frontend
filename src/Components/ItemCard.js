import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { IconButton } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

export default function ItemCard({ item }) {
  return (
	<div style={{margin:24}}>
		<Card>
			<CardHeader 
				action={
					<IconButton>
						<DeleteOutlined />
					</IconButton>
				}
				title={item.Title}
				subheader={"test"}
			/>
		</Card>
	</div>
  )
}
