import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container } from '@mui/material';
import ItemCard from './Components/ItemCard';
import Masonry from 'react-masonry-css';

const Dashboard = () => {
	const [Items, setItems] = useState([]);
	const [isPending, setIsPending] = useState(false);

	const history = useHistory();

	useEffect( () => {
		async function signcheck() {
			const res = await fetch("http://localhost:9000/signcheck", {
				method: "GET",
				withCredntials: true,
				mode: 'cors',
				credentials: 'include'
			})
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
			const data = await res.json();
			console.log(data);
			if (data !== 'Authentication missing' | data !=='Authentication failed') {
				setItems(data);
			} else {
				console.log('User not logged in');
				history.push('/');
			}
		}
		signcheck();
		getList();

	}, []);

	const handleDelete = async (id) => {
		const delete_details = { _id: id }

		setIsPending(true);

		try {
			const res =  await fetch("http://localhost:9000/dashboard/delete", {
				method: "DELETE",
				withCredntials: true,
				mode:'cors',
				credentials: 'include',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(delete_details)
			})
			const data = await res.json();
			console.log(data);
			if (data) {
				setItems(data);
				setIsPending(false)
			} else {
				console.log('Item could not be deleted due to a server side issue.');
			}
			
		} 
		catch (err) {
			console.log(err);
		}}

		const breakpoints = {
			default: 3,
			1100: 2,
			700: 1
		}

	return (
		<Container>
			<Masonry
				breakpointCols={breakpoints}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column "
			>
				{Items.map(Item => (
					<div key={Item._id}>
						<ItemCard item={Item} handleDelete={handleDelete} setIsPending={setIsPending} isPending={isPending} />
					</div>
				))}
			</Masonry>
		</Container>
	);
};

export default Dashboard;
