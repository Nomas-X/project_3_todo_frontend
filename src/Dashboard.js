import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, Paper } from '@mui/material';
import ItemCard from './Components/ItemCard';

const Dashboard = () => {
	const [isPending, setIsPending] = useState('');
	const [pendingItems, setPendingItems] = useState([]);
	const [completedItems, setCompletedItems] = useState([]);
	let i = 0;

	const history = useHistory();

	useEffect( () => {
		setIsPending(true);
		async function signcheck() {
			const res = await fetch("http://localhost:9000/signcheck", {
				method: "GET",
				withCredntials: true,
				mode: 'cors',
				credentials: 'include'
			})
			setIsPending(false);
			const data = await res.json();
			console.log(data);
			if (data === 'Authentication successful') {
				console.log('User logged in')
			} else {
				history.push('/')
				console.log('User not logged in');
			}
		}
		async function getList() {
			const res = await fetch("http://localhost:9000/dashboard/find", {
				method: "GET",
				withCredntials: true,
				mode: 'cors',
				credentials: 'include'
			})
			setIsPending(false);
			const data = await res.json();
			console.log(data);
			if (data !== 'Authentication missing' | data !=='Authentication failed') {
				setPendingItems(data.pending);
				setCompletedItems(data.completed);
			} else {
				console.log('User not logged in');
				history.push('/');
			}
		}
		signcheck();
		getList();

	}, []);

	return (
		<Container>
			<Grid style={{margin:24}} container spacing={0}>
				{pendingItems.map(pendingItem => (
					<Grid key={i++} md={6}>
						<ItemCard item={pendingItem} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Dashboard;
