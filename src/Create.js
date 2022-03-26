import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	field: {
	  marginTop: '20px !important	',
	  marginBottom: '20px !important',
	  display: 'block !important'
	},
	input: {
		width: '80px',
		height: '50px',
		marginBottom: '20px'
	}
  })

export default function Create() {
	const classes = useStyles();
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);
	const [category, setCategory] = useState('');
	const [color, setColor] = useState('#3f51b5');

	const handleSubmit = (e) => {
		e.preventDefault();
		setTitleError(false);
		setDetailsError(false);

		const uid = '';

		if (title === '') {
			setTitleError(true);
		}
		if (details === '') {
			setDetailsError(true);
		}
		if (title && details) {
			fetch('http://localhost:9000/dashboard/add', {
				method: 'POST',
				withCredntials: true,
				mode: 'cors',
				credentials: 'include',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ uid, title, details, category, color }),
			}).then(() => history.push('/'));
		}
	};

	return (
		<Container size='sm'>
			<Typography
				variant='h6'
				color='textSecondary'
				component='h2'
				gutterBottom>
				Add a new Todo
			</Typography>

			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<TextField
					className={classes.field}
					onChange={(e) => setTitle(e.target.value)}
					label='Title'
					variant='outlined'
					color='secondary'
					fullWidth
					required
					error={titleError}
				/>
				<TextField
					className={classes.field}
					onChange={(e) => setDetails(e.target.value)}
					label='Details'
					variant='outlined'
					color='secondary'
					multiline
					rows={4}
					fullWidth
					required
					error={detailsError}
				/>
				<TextField
					className={classes.field}
					onChange={(e) => setCategory(e.target.value)}
					label='Category'
					variant='outlined'
					color='secondary'
					multiline
					rows={1}
					required
					error={detailsError}
				/>

				<input
					type='color'
					list='presetColors'
					className={classes.input}
					defaultValue='#3f51b5'
					onChange={(e) => setColor(e.target.value)}
				/>
				<datalist id='presetColors'>
					<option>#3f51b5</option>
					<option>#2196f3</option>
					<option>#ffeb3b</option>
					<option>#00e676</option>
					<option>#ff3d00</option>
					<option>#f50057</option>
				</datalist>

				<Button
					type='submit'
					color='secondary'
					variant='contained'
					endIcon={<KeyboardArrowRightIcon />}>
					Submit
				</Button>
			</form>
		</Container>
	);
}