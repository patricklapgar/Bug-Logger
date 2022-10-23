import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import LogItem from './LogItem'
import AddLogItem from './AddLogItem'
import { ipcRenderer } from 'electron'


const App = () => {

	const [logs, setLogs] = useState([]) // Set logs to empty state

	const [alert, setAlert] = useState({
		show: false,
		message: '',
		variant: 'success'
	})

	useEffect(() => {
		// Send events to main process to let it know logs are ready to be received
		ipcRenderer.send('logs:load')
		ipcRenderer.on('logs:get', (event, logs) => {
			setLogs(JSON.parse(logs))
		})

		ipcRenderer.on('logs:clear', () => {
			setLogs([]) // Reset setLogs to empty state
			showAlert('Logs Cleared')
		})

	}, [])

	function addItem(item) {

		if (item.text === '' || item.user === '' || item.priority === ''){
			showAlert('Please enter all fields', 'danger')
			return false;
		}

		// item._id = Math.floor(Math.random() * 90000) + 10000
		// item.created = new Date().toString();
		// setLogs([...logs, item])

		ipcRenderer.send('logs:add', item)

		showAlert('Log Added')
	}

	function deleteItem (_id) {
		// setLogs(logs.filter((item) => item._id !== _id))
		ipcRenderer.send('logs:delete', _id)
		showAlert('Log Removed')
	}

	// Pop up the alert box after a log has been submitted for 3 seconds
	function showAlert(message, variant='success', seconds = 3000) {
		setAlert({
			show: true,
			message,
			variant
		})

		setTimeout(() => {
			setAlert({
				show:false,
				message: '',
				variant: 'success'
			})
		}, seconds)
	}

	return (
		<Container>
			<AddLogItem addItem={addItem}/>
			{alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
			<Table>
				<thead>
					<tr>
						<th>Priority</th>
						<th>Log Text</th>
						<th>User</th>
						<th>Created</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{ logs.map((log) => (
						<LogItem key={log._id} log={log} deleteItem={deleteItem} />
					)) }
				</tbody>
			</Table>
		</Container>
	)
}

export default App
