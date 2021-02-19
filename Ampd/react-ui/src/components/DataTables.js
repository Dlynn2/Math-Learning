import React, { Component } from 'react'
import { CSVLink } from 'react-csv'
import axios from 'axios'
import { addAdmin, getDataTable, isClassNow, getCurrentClass, getSubscription, setSubscription, getSubscriptionsFor } from './UserFunctions'
import { Table } from 'reactstrap'
class DataTables extends Component {
	constructor() {
		super()
		this.state = {
			survey_data: [],
			header: []
		}
	}
	respData = ''

	async getTable() {
		this.respData = await getDataTable(0)
		this.count = this.respData.data.length-5
		this.displayData = this.respData.data.slice(this.count)
		this.setState(this.respData.data)
	}

	async componentDidMount() {
		//get datatable
		await this.getTable()
		this.setState({ survey_data: this.displayData })
		this.setState({ header: Object.keys(this.state.survey_data[0]) })
	}

	renderTableHeader() {
		let headerTest = {}
		headerTest = this.state.header
		return headerTest.map((key, index) => {
			return <th key={index}>{key.toUpperCase()}</th>
		})
	}
	renderTableData() {
		return this.state.survey_data.map((survies, index) => {
			const { UserID, ClassID, ObsID, Concentration, Interest, Enjoyment, Challenge, Skill, Timestamp } = survies //destructuring
			return (
				<tr key={UserID}>
					<td>{Timestamp}</td>
					<td>{ObsID}</td>
					<td>{UserID}</td>
					<td>{ClassID}</td>
					<td>{Concentration}</td>
					<td>{Enjoyment}</td>
					<td>{Interest}</td>
					<td>{Challenge}</td>
					<td>{Skill}</td>
				</tr>
			)
		})
	}
	render() {
		return (
			<div>
				{this.respData.data ?
					<p><CSVLink
						data={this.respData.data}
						filename={'ampdTable.csv'}>Download</ CSVLink> Entire Table As CSV</p>
					: <p>Download Entire Table As CSV</p>}
				<div>
					<Table striped hover bordered id='survey answers'>
						<thead>
							<tr>
								{this.renderTableHeader()}
							</tr>
						</thead>
						<tbody>
							{this.renderTableData()}
						</tbody>
					</Table>
				</div>
				<div>
					<p>{this.count} more entries</p>
				</div>
			</div>
		)
	}
}

export default DataTables
